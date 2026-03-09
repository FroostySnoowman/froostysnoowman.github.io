const EMAIL = "jacob.j.beal@icloud.com";

const MAILTO_SUBJECT =
  "Portfolio Inquiry - [Your Name / Company]";

const MAILTO_BODY = `Hi Jacob,

I'm reaching out after viewing your portfolio (froostysnoowman.github.io).

Purpose: (e.g., Project inquiry / Full-time role / Contract work)

Details:
[Describe your project, role, or opportunity here]

Timeline: [If applicable]

Best regards,
[Your Name]`;

export const MAILTO_URL = `mailto:${EMAIL}?subject=${encodeURIComponent(MAILTO_SUBJECT)}&body=${encodeURIComponent(MAILTO_BODY)}`;
