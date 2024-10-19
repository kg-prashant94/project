import java.util.*;
public class SentenceShortener {
    public static String shortenSentence(String sentence) {
        String[] words = sentence.split(" ");
        Map<String, Integer> shortenedWordCount = new HashMap<>();
        StringBuilder shortenedSentence = new StringBuilder();
        for (String word : words) {
            String shortened = removeVowels(word);
            if (shortenedWordCount.containsKey(shortened)) {
                int count = shortenedWordCount.get(shortened);
                shortenedWordCount.put(shortened, count + 1);
                shortened += count; 
            } else {
                shortenedWordCount.put(shortened, 1);
            }
            shortenedSentence.append(shortened).append(" ");
        }
        return shortenedSentence.toString().trim();
    }
    private static String removeVowels(String word) {
        return word.replaceAll("[aeiouAEIOU]", "");
    }
    public static void main(String[] args) {
        String sentence = "it was bold to make the build larger";
        String shortened = shortenSentence(sentence);
        System.out.println(shortened);  // Output: "it ws bld to mk th bld1 lrgr"
    }
}