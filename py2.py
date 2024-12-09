import tensorflow as tf
from transformers import T5Tokenizer, TFT5ForConditionalGeneration

# 1. Data Preparation
data = [("iloveuUSA", "I love USA"), ("helloworld", "Hello World"), ("goodmorning", "Good morning")]
train_data, test_data = data[:2], data[2:]

# Tokenize data
def tokenize_data(data, tokenizer, max_length=50):
    inputs, targets = [], []
    for noisy, corrected in data:
        input_enc = tokenizer(f"fix: {noisy}", max_length=max_length, padding="max_length",
                              truncation=True, return_tensors="np")
        target_enc = tokenizer(corrected, max_length=max_length, padding="max_length",
                               truncation=True, return_tensors="np")
        inputs.append(input_enc["input_ids"][0])
        targets.append(target_enc["input_ids"][0])
    return inputs, targets

tokenizer = T5Tokenizer.from_pretrained("t5-small")
train_inputs, train_targets = tokenize_data(train_data, tokenizer)
test_inputs, test_targets = tokenize_data(test_data, tokenizer)

# 2. Data Generator
def data_generator(inputs, targets, batch_size):
    dataset = tf.data.Dataset.from_tensor_slices((inputs, targets))
    return dataset.shuffle(len(inputs)).batch(batch_size)

batch_size = 2
train_dataset = data_generator(train_inputs, train_targets, batch_size)
test_dataset = data_generator(test_inputs, test_targets, batch_size)

# 3. Model and Training Setup
model = TFT5ForConditionalGeneration.from_pretrained("t5-small")
optimizer = tf.keras.optimizers.Adam(learning_rate=5e-5)
loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)

model.compile(optimizer=optimizer, loss=loss_fn)
model.fit(train_dataset, validation_data=test_dataset, epochs=3)

# 4. Testing and Prediction
def generate_text(input_text, model, tokenizer, max_length=50):
    input_ids = tokenizer(f"fix: {input_text}", return_tensors="tf", padding="max_length",
                          truncation=True, max_length=max_length).input_ids
    output_ids = model.generate(input_ids, max_length=max_length, num_beams=5, early_stopping=True)
    return tokenizer.decode(output_ids[0], skip_special_tokens=True)

test_sentence = "iloveuUSA"
corrected_sentence = generate_text(test_sentence, model, tokenizer)
print(f"Original: {test_sentence}\nCorrected: {corrected_sentence}")
