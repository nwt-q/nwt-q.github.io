Reading Comprehension Questions (Based on the SAP Framework Paper)

Directions:

> Read the following questions carefully and choose the best answer from the options provided. Refer to the content of the paper for accurate responses.

Questions:

1. What is the core problem that the SAP framework aims to solve?

    A. Reducing the computational cost of pre-trained language model (PLM) fine-tuning

    B. Mitigating private data leakage in Model-as-a-Service (MaaS) based Parameter-Efficient Fine-Tuning (PEFT)

    C. Improving the accuracy of text generation tasks for large language models

    D. Simplifying the deployment process of customized PLMs on cloud platforms

1. Which two key techniques are integrated into the SAP framework to achieve privacy preservation?

    A. Split learning and differential privacy

    B. Low-Rank Adaptation (LoRA) and fully homomorphic encryption

    C. Text privatization and attention-based token pruning

    D. Embedding inversion defense and attribute inference resistance

2. What is the purpose of the Contributing-Token-Identification (CTI) method proposed in the paper?

    A. To identify the optimal split layer between the bottom and top models in split learning

    B. To balance model utility degradation and privacy leakage by adjusting perturbation on important tokens

    C. To accelerate the fine-tuning process by pruning irrelevant tokens

    D. To enhance the robustness of PLMs against white-box attacks

3. For text generation tasks (e.g., question-answering on SQuAD), how does CTI determine token importance?

    A. By analyzing term frequency-inverse document frequency (TF-IDF)

    B. By calculating the statistical contribution of tokens to each category

    C. By leveraging attention scores from the Multi-head Attention (MHA) mechanism

    D. By measuring the Euclidean distance between token embeddings

4. Which datasets are used to evaluate the performance of the SAP framework on text classification tasks?

    A. SQuAD, Financial Phrasebank (FP), and Blog

    B. Stanford Sentiment Treebank (SST), FP, and Blog

    C. SST, SQuAD, and Llama-3 benchmark

    D. Blog, FP, and Roberta-Large dataset


5. Why do existing privacy-preserving fine-tuning methods (e.g., DP-Forward, SLDP-FT) struggle to balance utility and privacy?

    A. They require excessive computational resources for model training

    B. They ignore the importance of tokens and rely on expensive differential privacy (DP) noise

    C. They are incompatible with Parameter-Efficient Fine-Tuning (PEFT) techniques like LoRA

    D. They can only be applied to text classification tasks, not generation tasks

6. What is the threat model assumption for the SAP framework?

    A. The service provider is malicious and actively tampers with the fine-tuning protocol

    B. The service provider is honest but curious, attempting to infer private data from intermediate representations

    C. The user’s private dataset is already compromised by external attackers

    D. The top model parameters are accessible to unauthorized third parties

7. On which dataset did the SAP framework achieve a 65% improvement in empirical privacy with only a 1% degradation in model performance?

    A. Financial Phrasebank (FP)

    B. Blog (topic classification dataset)

    C. Stanford Sentiment Treebank (SST)

    D. SQuAD (question-answering dataset)



