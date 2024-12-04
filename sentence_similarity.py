import math

# Function to tokenize and count word frequency
def tokenize(sentence):
    words = sentence.lower().split()
    word_count = {}
    for word in words:
        if word not in word_count:
            word_count[word] = 1
        else:
            word_count[word] += 1
    return words, word_count  # return words and word frequency

# Function to create a vector from word frequencies
def create_vector(sentence1, sentence2):
    # Tokenize the sentences
    words1, word_count1 = tokenize(sentence1)
    words2, word_count2 = tokenize(sentence2)
    
    # Combine all unique words from both sentences
    all_words = set(word_count1.keys()).union(set(word_count2.keys()))
    
    # Create vectors based on word frequencies
    vector1 = [word_count1.get(word, 0) for word in all_words]
    vector2 = [word_count2.get(word, 0) for word in all_words]
    
    return words1, words2, vector1, vector2

# Function to compute cosine similarity
def cosine_similarity(vec1, vec2):
    # Dot product
    dot_product = sum(v1 * v2 for v1, v2 in zip(vec1, vec2))
    
    # Magnitudes
    magnitude1 = math.sqrt(sum(v1**2 for v1 in vec1))
    magnitude2 = math.sqrt(sum(v2**2 for v2 in vec2))
    
    if magnitude1 == 0 or magnitude2 == 0:
        return 0  # Avoid division by zero
    
    return dot_product / (magnitude1 * magnitude2)

# Function to compute Levenshtein Distance (edit distance) between two words
def levenshtein_distance(word1, word2):
    # Initialize matrix
    len_word1 = len(word1)
    len_word2 = len(word2)
    dp = [[0] * (len_word2 + 1) for _ in range(len_word1 + 1)]

    for i in range(len_word1 + 1):
        for j in range(len_word2 + 1):
            if i == 0:
                dp[i][j] = j  # First word is empty, so add characters from word2
            elif j == 0:
                dp[i][j] = i  # Second word is empty, so add characters from word1
            elif word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]  # No change needed if characters are the same
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])  # Insert, remove, or replace

    return dp[len_word1][len_word2]

# Function to compute sequence difference (considering fuzzy word matching)
def sequence_difference(words1, words2):
    diff_count = 0
    max_len = max(len(words1), len(words2))
    
    # Compare word-by-word with fuzzy matching
    for i in range(max_len):
        if i >= len(words1) or i >= len(words2):
            diff_count += 1  # If one sentence is shorter
        else:
            # Compare using Levenshtein distance for fuzzy matching
            lev_distance = levenshtein_distance(words1[i], words2[i])
            # If distance is more than 1 (or a threshold you define), consider it as a difference
            if lev_distance > 1:
                diff_count += 1

    return diff_count

# Function to compute combined similarity score
def combined_similarity(sentence1, sentence2):
    # Create vectors and word lists for both sentences
    words1, words2, vector1, vector2 = create_vector(sentence1, sentence2)

    # Compute cosine similarity
    similarity = cosine_similarity(vector1, vector2)

    # Compute sequence difference
    seq_diff = sequence_difference(words1, words2)

    # Normalize sequence difference (scaled to 0-1 range)
    max_possible_diff = max(len(words1), len(words2))  # Maximum possible sequence difference
    normalized_seq_diff = seq_diff / max_possible_diff  # Normalize to 0-1 range
    
    # Adjust sequence difference penalty (if sequence is drastically different, apply larger penalty)
    penalty_factor = 1 - normalized_seq_diff  # If sequence difference is high, the penalty is larger

    # Combined similarity score (adjusted for sequence difference)
    combined_score = (similarity * 0.4) + (penalty_factor * 0.6)  # More weight on sequence difference

    return combined_score, similarity, normalized_seq_diff
