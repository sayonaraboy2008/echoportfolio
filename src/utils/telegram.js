/**
 * Dispatch contact form message to Telegram bot or chat channel
 */
export async function sendTelegramMessage(botConfig, { name, email, message }) {
  if (!botConfig || !botConfig.token || !botConfig.chatId) {
    throw new Error('Telegram Bot is not configured properly.');
  }

  const text = `🚀 *New Portfolio Inquiry* 🚀\n\n` +
    `👤 *Name:* ${name}\n` +
    `📧 *Contact:* ${email}\n` +
    `📅 *Date:* ${new Date().toLocaleString()}\n\n` +
    `💬 *Message:*\n${message}`;

  const url = `https://api.telegram.org/bot${botConfig.token}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: botConfig.chatId,
      text: text,
      parse_mode: 'Markdown',
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.description || `Telegram API error (${response.status})`);
  }

  return await response.json();
}
