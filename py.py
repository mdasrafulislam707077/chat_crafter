from sentence_similarity import combined_similarity


import random

def wrong_sentence_generator(sentence, rate):
    """
    Generates a 'wrong' version of the input sentence by modifying it based on the given rate.
    
    Parameters:
        sentence (str): The original sentence.
        rate (float): A float (0 to 1) indicating the fraction of words to modify.
    
    Returns:
        str: The modified 'wrong' sentence.
    """
    # Tokenize the sentence into words
    words = sentence.split()
    total_words = len(words)
    
    if total_words == 0:
        return sentence  # Return unchanged if the sentence is empty
    
    # Calculate the number of words to modify
    num_to_modify = max(1, int(total_words * rate))
    
    # Choose indices of words to modify
    indices_to_modify = random.sample(range(total_words), num_to_modify)
    
    # Generate the wrong sentence
    for idx in indices_to_modify:
        modification_type = random.choice(['replace', 'remove', 'shuffle'])
        
        if modification_type == 'replace':
            # Replace the word with a random incorrect word
            words[idx] = ''.join(random.choices("abcdefghijklmnopqrstuvwxyz", k=random.randint(3, 6)))
        
        elif modification_type == 'remove':
            # Remove the word
            words[idx] = ''
        
        elif modification_type == 'shuffle' and len(words) > 1:
            # Shuffle the word with another random word
            swap_idx = random.randint(0, total_words - 1)
            words[idx], words[swap_idx] = words[swap_idx], words[idx]
    
    # Rebuild the sentence and remove empty strings
    wrong_sentence = ' '.join(word for word in words if word)
    
    return wrong_sentence

# Example usage
original_sentence = "The quick brown fox jumps over the lazy dog"
rate = 0.3  # 30% of the sentence will be modified

wrong_sentence = wrong_sentence_generator(original_sentence, rate)




sentence1 = original_sentence
sentence2 = wrong_sentence

# Compute combined similarity score
combined_score, similarity, seq_diff = combined_similarity(sentence1, sentence2)

print(f"Original Sentence: {original_sentence}")
print(f"Wrong Sentence: {wrong_sentence}")
print(f"Combined similarity score: {combined_score}")


# def 
