package pl.pjm77.weightliftinglog.security.constraint;

import org.passay.*;
import org.passay.dictionary.WordListDictionary;
import org.passay.dictionary.WordLists;
import org.passay.dictionary.sort.ArraysSort;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.io.FileReader;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class PasswordConstraintValidator implements ConstraintValidator<ValidPassword, String> {

    private DictionaryRule dictionaryRule;

    @Override
    public void initialize(ValidPassword constraintAnnotation) {
        try {
            String invalidPasswordList =
                    this.getClass().getResource("/invalid-password-list.txt").getFile();
            dictionaryRule = new DictionaryRule(new WordListDictionary(WordLists.createFromReader(
                    new FileReader[] {new FileReader(invalidPasswordList)},
                    false, new ArraysSort()
            )));
        } catch (IOException e) {
            throw new RuntimeException("Could not load invalid password list!", e);
        }

    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext constraintValidatorContext) {

        PasswordValidator validator = new PasswordValidator(Arrays.asList(

                new LengthRule(4, 30),

                new WhitespaceRule(),

                dictionaryRule

        ));

        RuleResult result = validator.validate(new PasswordData(password));
        if (result.isValid()) { return true; }

        List<String> messages = validator.getMessages(result);
        String messageTemplate = messages.stream().collect(Collectors.joining(","));
        constraintValidatorContext.buildConstraintViolationWithTemplate(messageTemplate)
                .addConstraintViolation().disableDefaultConstraintViolation();
        return false;
    }
}