package com.panpawelw.weightliftinglog.registration.listener;

import com.panpawelw.weightliftinglog.registration.event.OnRegistrationCompleteEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import com.panpawelw.weightliftinglog.models.User;
import com.panpawelw.weightliftinglog.models.VerificationToken;
import com.panpawelw.weightliftinglog.services.EmailService;
import com.panpawelw.weightliftinglog.services.VerificationTokenService;

@Component
public class RegistrationListener implements ApplicationListener<OnRegistrationCompleteEvent> {

  private final EmailService emailService;

  private final VerificationTokenService verificationTokenService;

  @Autowired
  public RegistrationListener(EmailService emailService,
      VerificationTokenService verificationTokenService) {
    this.emailService = emailService;
    this.verificationTokenService = verificationTokenService;
  }

  @Override
  public void onApplicationEvent(final OnRegistrationCompleteEvent event) {
    final User user = event.getUser();
    VerificationToken verificationToken = new VerificationToken(user);
    verificationTokenService.saveToken(verificationToken);
    emailService.sendEmail(user.getEmail(), "weightliftinglog@panpawelw.com",
        "Weightlifting Log registration confirmation", "You have registered an " +
            "account on Weightlifting Log website. To verify your account please " +
            "click the link below withing 24 hours to confirm your account: \n\n " +
            "http://3.127.81.40:8080/Weightlifting_Log/confirm-account?token=" +
            verificationToken.getToken() + "\n\nHave a nice day!");
  }
}
