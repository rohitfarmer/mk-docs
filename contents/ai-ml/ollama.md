# Ollama with Open WebUI

Ollama is an open-source platform designed to run large language models locally. It allows users to generate text, assist with coding, and create content privately and securely on their own devices. 

Open WebUI is an extensible, feature-rich, and user-friendly self-hosted AI platform designed to operate entirely offline. It supports various LLM runners like Ollama and OpenAI-compatible APIs, with built-in inference engine for RAG, making it a powerful AI deployment solution.

* [Ollama](https://ollama.com/)
* [Ollama GitHub](https://github.com/ollama/ollama)
* [Open WebUI](https://openwebui.com/)
* [Open WebUI GitHub](https://github.com/open-webui/open-webui)

## Install Ollama

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

## Run a Model

```bash
ollama run gemma3
```

## Install Open WebUI 

```bash
pip install open-webui
```

```bash
open-webui serve --port 8090
```

## Models to Use

### Gemma

Gemma is a series of open-source large language models developed by Google DeepMind. It is based on similar technologies as Gemini. 

[Gemma Website](https://deepmind.google/models/gemma/)
[Gemma Cookbook](https://github.com/google-gemini/gemma-cookbook)

#### Gemma 3

The Gemma 3 models are multimodal—processing text and images—and feature a 128K context window with support for over 140 languages. Available in 270M, 1B, 4B, 12B, and 27B parameter sizes, they excel in tasks like question answering, summarization, and reasoning, while their compact design allows deployment on resource-limited devices.

[Gemma 3 in Ollama](https://ollama.com/library/gemma3)
