<?php

add_action('wp_enqueue_scripts', function () {
    if (is_page('precalificar')) {
        wp_enqueue_style('leads', (get_template_directory_uri() . '/leads-dist/index.css?v=' . mydate()), array ());
        wp_enqueue_script(
            'leads',
            get_stylesheet_directory_uri() . '/leads-dist/index.js?v=' . mydate(),
            array (),
            null,
            true
        );
        wp_localize_script(
            'leads',
            'WPURLS',
            array (
                'ajaxurl' => admin_url("admin-ajax.php"),
                'homeurl' => trailingslashit(home_url()),
                'imgPath' => get_stylesheet_directory_uri() . '/img',
                'nonce' => wp_create_nonce("ajax_nonce")
            )
        );
    }
}, 20);

add_filter('script_loader_tag', 'add_jsmodule', 10, 3);
function add_jsmodule($tag, $handle, $src)
{
    // if not your script, do nothing and return original $tag
    if ('leads' !== $handle) {
        return $tag;
    }
    // change the script tag by adding type="module" and return it.
    $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
    return $tag;
}

add_action('wp_ajax_nopriv_step-one', 'create_new_lead');
add_action('wp_ajax_step-one', 'create_new_lead');

function create_new_lead()
{
    $data = json_decode(file_get_contents("php://input"));
    error_log('Datos recibidos en la solicitud AJAX: ' . print_r($data, true));
    try {
        if (!wp_verify_nonce($data->nonce, 'ajax_nonce'))
            throw new \Exception("Verificación nonce no válida ✋", 403);
        if (!'POST' == $_SERVER['REQUEST_METHOD'] && !isset($data->nombre) && $data->nombre === "")
            throw new \Exception("Ups! algo salió mal en la solicitud");
        $form_id = sanitize_text_field($data->id);
        $nombre = sanitize_text_field($data->nombre);
        $cedula = sanitize_text_field($data->cedula);
        $celular = sanitize_text_field($data->celular);
        $correo = sanitize_email($data->correo);

        $ruc = isset($data->ruc) ? sanitize_text_field($data->ruc) : null;
        $razon_social = isset($data->razon_social) ? sanitize_text_field($data->razon_social) : null;

        $ciudad = sanitize_text_field($data->ciudad);
        $sector = sanitize_text_field($data->sector);

        add_filter('wp_mail_content_type', function ($content_type) {
            return 'text/html';
        });

        $to = get_option('admin_email');
        $form_type = $form_id == 1 ? 'Natural' : 'Jurídica';
        $subject = "Nuevo Lead Persona {$form_type} - Cessio Factoring";
        $message = "<html><head><style type='text/css'>.forma{font:16px Verdana}</style></head><body><p class='forma'>Tienes un nuevo contacto</p><br>";
        $message .= '<p>Datos del contacto------------------</p>';
        $message .= '<p>Nombre: ' . $nombre . '<br/>
                        Cédula: ' . $cedula . '<br/>
                        Celular: ' . $celular . '<br/>
                        Correo: ' . $correo . '<br/>';
        if ($form_id == 2) {
            $message .= 'RUC: ' . $ruc . '<br/>
                        Razón Social: ' . $razon_social . '<br/>';
        }
        $message .= 'Ciudad: ' . $ciudad . '<br/>
                     Sector: ' . $sector . '</p>';
        $message .= '<p>Puedes revisar más datos en la pestaña <b>Lead</b> del administrador de Wordpress de tu sitio.</p>';
        $message .= '</body></html>';

        $send = wp_mail($to, $subject, $message);

        if (!$send)
            throw new \Exception("Falló el envio de correo");
        $lead = array(
            'post_title' => wp_strip_all_tags($nombre),
            'post_status' => 'pending',
            'post_type' => $form_id == 1 ? 'lead-natural' : 'lead-juridica',
        );

        $post_id = wp_insert_post($lead);
        if (!$post_id)
            throw new \Exception("Error al tratar de registrar un nuevo lead");
        update_field('cedula', $cedula, $post_id);
        update_field('celular', $celular, $post_id);
        update_field('correo', $correo, $post_id);
        if($form_id == 2){
            update_field('ruc', $ruc, $post_id);
            update_field('razon_social', $razon_social, $post_id);
        }
        update_field('ciudad', $ciudad, $post_id);
        update_field('sector', $sector, $post_id);

        $response = array('ok' => true, 'post_id' => $post_id, 'message' => 'Datos guardados con éxito');
        wp_send_json_success($response, 200);
    } catch (\Exception $error) {
        $response = array(
            'ok' => false,
            'message' => $error->getMessage()
        );
        if ($error->getCode() === 403) {
            wp_send_json_error($response, 403);
        } else {
            wp_send_json_error($response, 500);
        }
        error_log('Error en la solicitud AJAX Step 1: ' . print_r($error->getMessage()));
    }
    wp_die();
}

add_action('wp_ajax_nopriv_step-two', 'update_lead');
add_action('wp_ajax_step-two', 'update_lead');

function update_lead()
{
    $data = json_decode(file_get_contents("php://input"));
    //error_log('Datos recibidos en la solicitud AJAX: ' . print_r($data, true));
    try {
        if (!wp_verify_nonce($data->nonce, 'ajax_nonce'))
            throw new \Exception("Verificación nonce no válida ✋", 403);
        if (!'POST' == $_SERVER['REQUEST_METHOD'] && !isset($data->producto_servicio_1) && $data->producto_servicio_1 === "")
            throw new \Exception("Ups! algo salió mal en la solicitud");
        
        $producto_servicio_1 = sanitize_text_field($data->producto_servicio_1);
        $producto_servicio_2 = sanitize_text_field($data->producto_servicio_2);
        $producto_servicio_3 = sanitize_text_field($data->producto_servicio_3);

        $venta_mes_anterior = sanitize_text_field($data->venta_mes_anterior);
        $ventas_ano_actual = sanitize_text_field($data->ventas_ano_actual);
        $ventas_ano_anterior = sanitize_text_field($data->ventas_ano_anterior);
        $ventas_sector_privado = sanitize_text_field($data->ventas_sector_privado);
        $ventas_sector_publico = sanitize_text_field($data->ventas_sector_publico);

        $compradores_negociar_1 = sanitize_text_field($data->compradores_negociar_1);
        $compradores_negociar_2 = sanitize_text_field($data->compradores_negociar_2);
        $compradores_negociar_3 = sanitize_text_field($data->compradores_negociar_3);

        $ruc_comprador_1 = sanitize_text_field($data->ruc_comprador_1);
        $ruc_comprador_2 = sanitize_text_field($data->ruc_comprador_2);
        $ruc_comprador_3 = sanitize_text_field($data->ruc_comprador_3);

        $revisar_buro = sanitize_text_field($data->revisar_buro);
        $terminos_condiciones = sanitize_text_field($data->terminos_condiciones);
        $post_id = sanitize_text_field($data->postId);

        update_field('producto_servicio_1', $producto_servicio_1, $post_id);
        $producto_servicio_2 !== "" && update_field('producto_servicio_2', $producto_servicio_2, $post_id);
        $producto_servicio_3 !== "" && update_field('producto_servicio_3', $producto_servicio_3, $post_id);

        update_field('venta_mes_anterior', $venta_mes_anterior, $post_id);
        update_field('ventas_ano_actual', $ventas_ano_actual, $post_id);
        update_field('ventas_ano_anterior', $ventas_ano_anterior, $post_id);
        update_field('ventas_sector_privado', $ventas_sector_privado, $post_id);
        update_field('ventas_sector_publico', $ventas_sector_publico, $post_id);

        update_field('compradores_negociar_1', $compradores_negociar_1, $post_id);
        $compradores_negociar_2 !== "" && update_field('compradores_negociar_2', $compradores_negociar_2, $post_id);
        $compradores_negociar_3 !== "" && update_field('compradores_negociar_3', $compradores_negociar_3, $post_id);
        update_field('ruc_comprador_1', $ruc_comprador_1, $post_id);
        $ruc_comprador_2 !== "" && update_field('ruc_comprador_2', $ruc_comprador_2, $post_id);
        $ruc_comprador_3 !== "" && update_field('ruc_comprador_3', $ruc_comprador_3, $post_id);

        update_field('revisar_buro', $revisar_buro == 1 ? 'SI' : '', $post_id);
        update_field('terminos_condiciones', $terminos_condiciones == 1 ? 'SI' : '', $post_id);

        $response = array('ok' => true, 'post_id' => $post_id, 'message' => 'Datos guardados con éxito');
        wp_send_json_success($response, 200);
    } catch (\Exception $error) {
        $response = array(
            'ok' => false,
            'message' => $error->getMessage()
        );
        if ($error->getCode() === 403) {
            wp_send_json_error($response, 403);
        } else {
            wp_send_json_error($response, 500);
        }
        error_log('Error en la solicitud AJAX Step 1: ' . print_r($error->getMessage()));
    }
    wp_die();
}