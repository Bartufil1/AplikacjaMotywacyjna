import nodemailer from "nodemailer";
import { sendMail } from "../app/service/mail";
import config from "../app/config";

jest.mock("nodemailer");

describe("sendMail function", () => {
  it("should send an email with the correct content", async () => {
    const to = "test@example.com";
    const token = "test-token";

    const sendMailMock = jest.fn().mockResolvedValue({});

    nodemailer.createTransport.mockReturnValue({
      sendMail: sendMailMock,
    });

    await sendMail(to, token);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      auth: {
        user: config.SMTP_USERNAME,
        pass: config.SMTP_PASSWORD,
      },
    });

    expect(sendMailMock).toHaveBeenCalledWith({
      from: `"Aplikacja Treningowo-Żywieniowa" <${config.SMTP_USERNAME}>`,
      to,
      subject: "Password reset",
      text: `Link do zresetowania hasła: ${"localhost:3001/reset/" + token}`,
    });
  });

  it("should handle errors from nodemailer", async () => {
    const to = "test@example.com";
    const token = "test-token";

    const sendMailMock = jest
      .fn()
      .mockRejectedValue(new Error("Nodemailer error"));

    nodemailer.createTransport.mockReturnValue({
      sendMail: sendMailMock,
    });

    await expect(sendMail(to, token)).rejects.toThrow("Nodemailer error");
  });
});
