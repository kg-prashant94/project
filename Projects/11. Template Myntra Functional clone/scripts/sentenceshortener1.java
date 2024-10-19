package ibmcode;

public class sentence {
    private boolean isVowel(char c)
    {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
    private String removeVowels(String word)
    {
        StringBuilder shortened = new StringBuilder();
        for (char c : word.toCharArray())
        {
            if (!isVowel(c))
            {
                shortened.append(c);
            }
        }
        return shortened.toString();
    }
    void shortenSentence(String sentence)
    {
        HashMap<String, Integer> wordCount = new HashMap<>();
        String[] words = sentence.split(" ");
        StringBuilder result = new StringBuilder();
        for (String word : words)
        {
            String shortenedWord = removeVowels(word);
            if (wordCount.containsKey(shortenedWord))
            {
                int count = wordCount.get(shortenedWord);
                wordCount.put(shortenedWord, count + 1);
                shortenedWord += count;
            }
            else
            {
                wordCount.put(shortenedWord, 1);
            }
            if (result.length() > 0)
            {
                result.append(" ");
            }
            result.append(shortenedWord);
        }
        System.out.println(result.toString());
    }
}
