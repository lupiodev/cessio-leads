export const sendData = async (values) => {
  const body = { ...values, nonce: WPURLS.nonce};
  try {
    const res = await fetch(`${WPURLS.ajaxurl}?action=${values.action}`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const { success, data } = await res.json();
    if (!success) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("🚀 ~ file: sendData.ts:13 ~ sendData:", error);
  }
};
