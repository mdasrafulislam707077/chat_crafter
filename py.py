import math
import random
from sentence_similarity import combined_similarity

def wrong_sentence_generator(sentence, rate):
    """
    Generates a 'wrong' version of the input sentence by modifying it based on the given rate.
    
    Parameters:
        sentence (str): The original sentence.
        rate (float): A float (0 to 1) indicating the fraction of words to modify.
    
    Returns:
        str: The modified 'wrong' sentence.
    """
    words = sentence.split()
    total_words = len(words)
    
    if total_words == 0:
        return sentence  # Return unchanged if the sentence is empty
    
    num_to_modify = max(1, int(total_words * rate))
    indices_to_modify = random.sample(range(total_words), num_to_modify)
    
    for idx in indices_to_modify:
        modification_type = random.choice(['replace', 'remove', 'shuffle'])
        
        if modification_type == 'replace':
            words[idx] = ''.join(random.choices("abcdefghijklmnopqrstuvwxyz", k=random.randint(3, 6)))
        elif modification_type == 'remove':
            words[idx] = ''
        elif modification_type == 'shuffle' and len(words) > 1:
            swap_idx = random.randint(0, total_words - 1)
            words[idx], words[swap_idx] = words[swap_idx], words[idx]
    
    wrong_sentence = ' '.join(word for word in words if word)
    return wrong_sentence


def dynamic_error_thresholds(sentence_length):
    """
    Calculate dynamic error thresholds based on sentence length.
    
    Parameters:
        sentence_length (int): The length of the sentence.
    
    Returns:
        tuple: A tuple containing (error_count_max, error_count_min).
    """
    base_max = 0.95  # Base max threshold
    base_min = 0.7   # Base min threshold
    scaling_factor = 0.05  # Controls how thresholds change with sentence length

    error_count_max = base_max - (math.log(sentence_length + 1) * scaling_factor)
    error_count_min = base_min - (math.log(sentence_length + 1) * scaling_factor)

    error_count_max = max(0.7, min(0.95, error_count_max))
    error_count_min = max(0.5, min(0.85, error_count_min))
    
    return error_count_max, error_count_min


def generateListOf(original_sentence, countIntents=30):
    """
    Generate a list of 'wrong' sentences based on the original sentence with dynamic error thresholds.
    
    Parameters:
        original_sentence (str): The input sentence to modify.
        countIntents (int): The number of wrong sentences to generate.
    
    Returns:
        list: A list of dictionaries containing wrong sentences, their similarity, and their type.
    """
    listOfWrong = []
    count = 0
    divCount = int(countIntents / 3)
    sentence_length = len(original_sentence.split())

    while True:
        if count < divCount:
            rate = 0.2
            types = "A"
        elif count < divCount * 2:
            rate = 0.3
            types = "B"
        elif count < divCount * 3:
            rate = 0.4
            types = "C"
        else:
            break

        error_count_max, error_count_min = dynamic_error_thresholds(sentence_length)
        wrong_sentence = wrong_sentence_generator(original_sentence, rate)
        sentence1 = original_sentence
        sentence2 = wrong_sentence
        combined_score, similarity, seq_diff = combined_similarity(sentence1, sentence2)

        if int(similarity) == 1:
            continue
        if similarity < error_count_max and similarity > error_count_min:
            listOfWrong.append({"wrong_sentence": wrong_sentence, "similarity": similarity, "type": types})
            count += 1

    return listOfWrong


# Example usage
original_sentence = "The quick brown fox jumps over the lazy dog"
generated_list = generateListOf(original_sentence, countIntents=30)

for item in generated_list:
    print(item)
