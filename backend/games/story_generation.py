from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

print("Loading GPT-2 model...")
model_name = "gpt2-medium"
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)
print("GPT-2 medium model loaded successfully!")

def format_prompt(user_input):
    return f"Write a short, imaginative story based on this idea:\n\"{user_input}\"\n\nStory:\n"
    
# Story Generation Game logic
def generate_story(user_input):
    prompt = format_prompt(user_input)
    input_ids = tokenizer.encode(prompt, return_tensors="pt")

    attention_mask = torch.ones_like(input_ids)


    output = model.generate(
        input_ids,
        attention_mask=attention_mask, 

        max_length=230,
        num_return_sequences=1,
        temperature=0.8,        
        top_p=0.9,              
        top_k=50,               
        repetition_penalty=1.2, 
        do_sample=True,
        pad_token_id=tokenizer.eos_token_id
    )
        
    story = tokenizer.decode(output[0], skip_special_tokens=True)
    return story.replace(prompt, "").strip() 
