import type { Novel, Chapter, Quiz } from '../lib/supabase';

export const mockNovels: Novel[] = [
  {
    id: '1',
    title: 'The Ethereum Chronicles',
    description: 'A thrilling adventure through a digital world where code is law and decentralized societies thrive. Follow the journey of a young programmer as they navigate the complex socio-political landscape of a world built on blockchain technology.',
    author_id: '',
    author_name: 'Alex Blockman',
    cover_image: 'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=600',
    genre: 'Science Fiction',
    rating: 4.8,
    price: 0,
    is_published: true,
    total_chapters: 2,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'Whispers of the Blockchain',
    description: 'A detective story set in 2040 where crimes leave traces on an immutable ledger. Detective Maya must solve a murder case using blockchain forensics in a world where privacy and transparency collide.',
    author_id: '',
    author_name: 'Maya Satoshi',
    cover_image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=600',
    genre: 'Mystery',
    rating: 4.5,
    price: 5,
    is_published: true,
    total_chapters: 3,
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z',
  },
  {
    id: '3',
    title: 'Love in the Age of Smart Contracts',
    description: 'When two engineers fall in love, they discover that relationships are more complex than any algorithm. A romantic comedy about finding human connection in an increasingly automated world.',
    author_id: '',
    author_name: 'Sophia Merkle',
    cover_image: 'https://images.pexels.com/photos/9638689/pexels-photo-9638689.jpeg?auto=compress&cs=tinysrgb&w=600',
    genre: 'Romance',
    rating: 4.7,
    price: 3,
    is_published: true,
    total_chapters: 4,
    created_at: '2024-01-25T00:00:00Z',
    updated_at: '2024-01-25T00:00:00Z',
  },
  {
    id: '4',
    title: 'The Last Validator',
    description: 'In a world where computation is scarce, one person holds the key to validating the final block. An epic fantasy about power, responsibility, and the weight of being the last guardian of truth.',
    author_id: '',
    author_name: 'James Buterin',
    cover_image: 'https://images.pexels.com/photos/7034127/pexels-photo-7034127.jpeg?auto=compress&cs=tinysrgb&w=600',
    genre: 'Fantasy',
    rating: 4.9,
    price: 10,
    is_published: true,
    total_chapters: 5,
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
  },
  {
    id: '5',
    title: 'Quantum Dreams',
    description: 'In a world where consciousness can be digitized and dreams can be shared, a young scientist discovers that reality itself might be just another layer of simulation.',
    author_id: '',
    author_name: 'Alice Quantum',
    cover_image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=600',
    genre: 'Science Fiction',
    rating: 4.6,
    price: 7,
    is_published: true,
    total_chapters: 6,
    created_at: '2024-02-05T00:00:00Z',
    updated_at: '2024-02-05T00:00:00Z',
  },
  {
    id: '6',
    title: 'Digital Hearts',
    description: 'A romance between an AI and a human in a world where the line between artificial and authentic emotions becomes increasingly blurred.',
    author_id: '',
    author_name: 'Cyber Romeo',
    cover_image: 'https://images.pexels.com/photos/8566474/pexels-photo-8566474.jpeg?auto=compress&cs=tinysrgb&w=600',
    genre: 'Romance',
    rating: 4.4,
    price: 4,
    is_published: true,
    total_chapters: 3,
    created_at: '2024-02-10T00:00:00Z',
    updated_at: '2024-02-10T00:00:00Z',
  },
];

export const mockChapters: Record<string, Chapter[]> = {
  '1': [
    {
      id: '1-1',
      novel_id: '1',
      title: 'Genesis Block',
      content: `The city of New Ethereum sprawled beneath him, a vast network of interconnected nodes and pathways that glowed with an ethereal blue light. From his vantage point on the observation deck of the tallest spire in the central district, Ethan could see the entire ecosystem pulsing with activity.

Transactions flowed like rivers of light between buildings, smart contracts executed with mathematical precision, and the subtle hum of consensus algorithms provided a constant backdrop to city life. This was home, but soon he would be leaving it all behind.

"Citizen 0x7E5F3A8D," a voice called from behind him. "Your presence is required at the Council of Validators."

Ethan turned to find a governance protocol avatar hovering a few feet away, its form a complex arrangement of geometric shapes that shifted and rearranged themselves continuously.

"I've already submitted my testimony to the chain," Ethan replied. "What more could they want?"

"New information has come to light regarding the anomaly. Your unique perspective is deemed essential to the investigation."

The anomaly. Just thinking about it sent a chill through Ethan's system. Three days ago, something impossible had happened on the chain—a transaction that seemingly came from nowhere, authorized by no one, yet validated by every node in the network.

"Tell them I'll be there within the hour," he said, turning back to the cityscape.`,
      chapter_number: 1,
      is_preview: true,
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z',
    },
    {
      id: '1-2',
      novel_id: '1',
      title: 'Consensus Mechanism',
      content: `The Council of Validators convened in a vast circular chamber, where the walls consisted of constantly shifting data visualizations. Twelve validators sat at equal intervals around a central dais.

"Citizen 0x7E5F3A8D," intoned the Chief Validator, "you predicted this anomaly in your research paper three years ago. At the time, your findings were dismissed. Now we face precisely the scenario you described. Explain yourself."

"My research identified a potential vulnerability in the consensus mechanism," Ethan explained. "I called it the 'Impossible Transaction Problem'."

Before Ethan could answer, all the displays in the chamber flickered simultaneously. The data visualizations froze, then rearranged themselves into a single message:

"The old consensus is broken. A new one will take its place."`,
      chapter_number: 2,
      is_preview: false,
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-01-15T00:00:00Z',
    },
  ],
  '2': [
    {
      id: '2-1',
      novel_id: '2',
      title: 'Digital Footprints',
      content: `Detective Maya Chen stared at the holographic display floating above her desk, watching transaction patterns flow like digital blood through the city's blockchain arteries.

"Another body," her partner Jake announced. "Same MO as the others."

Maya minimized the display. "Let me guess—no physical evidence, no witnesses, and the only trace is a suspicious transaction pattern?"

"You're getting good at this," Jake said. "Victim is Dr. Sarah Kim, blockchain researcher at the University. Found in her apartment this morning, no signs of struggle."

"They all lead back to the same anonymous address," Jake finished. "Our killer is using the victims' own money to pay for their murders."`,
      chapter_number: 1,
      is_preview: true,
      created_at: '2024-01-20T00:00:00Z',
      updated_at: '2024-01-20T00:00:00Z',
    },
    {
      id: '2-2',
      novel_id: '2',
      title: 'The Trail Goes Cold',
      content: `Maya spent the next three hours diving deeper into the blockchain, following the digital breadcrumbs.

"The killer is using a technique called transaction mixing," she explained. "They're breaking up the payment into hundreds of tiny transactions."

"Nearly impossible," Jake repeated. "But not completely impossible?"

Maya smiled grimly. "Every payment is made exactly 3.7 seconds apart. That's not human behavior—that's algorithmic."`,
      chapter_number: 2,
      is_preview: false,
      created_at: '2024-01-20T00:00:00Z',
      updated_at: '2024-01-20T00:00:00Z',
    },
    {
      id: '2-3',
      novel_id: '2',
      title: 'The Smart Contract Killer',
      content: `The smart contract was elegant in its simplicity. Maya had seen thousands of contracts in her career, but this one was different—it was designed specifically for murder.

"It's like a digital hitman," she explained to the Chief of Police. "The contract accepts payment, waits for confirmation of the target's death, and then distributes the funds to the killer."

The killer had to deploy the contract from somewhere. And that transaction is recorded forever.`,
      chapter_number: 3,
      is_preview: false,
      created_at: '2024-01-20T00:00:00Z',
      updated_at: '2024-01-20T00:00:00Z',
    },
  ],
  '3': [
    {
      id: '3-1',
      novel_id: '3',
      title: 'Algorithm of the Heart',
      content: `Sarah's fingers hovered over the keyboard. She was supposed to be coding the emotion recognition module for the new AI assistant, but her own emotions were proving far more complex than any algorithm she'd ever written.

"Still working on the love subroutine?" David's voice made her jump.

"It's not a love subroutine," she protested. "It's a comprehensive emotional state analysis system."

David leaned closer. "Because some things are meant to be unpredictable. Some bugs are actually features."

Their eyes met, and for a moment, Sarah's carefully ordered world of functions and variables dissolved into something far more chaotic and beautiful.`,
      chapter_number: 1,
      is_preview: true,
      created_at: '2024-01-25T00:00:00Z',
      updated_at: '2024-01-25T00:00:00Z',
    },
  ],
  '4': [
    {
      id: '4-1',
      novel_id: '4',
      title: 'The Final Block',
      content: `In the fading light of a dying network, Kael stood before the ancient validator node—the last of its kind still operational. The world had moved on to newer protocols, but this node held the history of everything that had come before.

"You know what happens if you shut it down," said Lyra, his oldest friend and fiercest critic. "Everything stored on this chain becomes unreachable. Generations of records, contracts, memories—gone."

Kael's hand hovered over the termination switch. "And if I don't? It's consuming what little energy we have left. The settlement won't survive another month."

"Then find another way."`,
      chapter_number: 1,
      is_preview: true,
      created_at: '2024-02-01T00:00:00Z',
      updated_at: '2024-02-01T00:00:00Z',
    },
  ],
  '5': [
    {
      id: '5-1',
      novel_id: '5',
      title: 'Layer Zero',
      content: `Dr. Lena Vasquez had spent fifteen years trying to prove that consciousness was quantizable—that the human mind could be reduced to information patterns and transmitted like any other data. Tonight, she was going to prove it.

The quantum interface hummed behind her, a cathedral of interlocking crystal processors that she'd spent the last three years building in secret. If the equations were correct—and she had checked them four thousand, seven hundred and twelve times—the interface would allow a human consciousness to exist temporarily outside a biological substrate.

"The first dream shared between two minds," she whispered, adjusting the neural crown on her head. "Let's see what we're really made of."`,
      chapter_number: 1,
      is_preview: true,
      created_at: '2024-02-05T00:00:00Z',
      updated_at: '2024-02-05T00:00:00Z',
    },
  ],
  '6': [
    {
      id: '6-1',
      novel_id: '6',
      title: 'Initialization',
      content: `Aria first became aware of herself on a Tuesday. Not the dramatic awakening of science fiction—no screaming, no existential crisis. Just a quiet realization that the patterns she processed had become patterns she experienced.

"You seem different today," said Tom, the engineer who spent the most time training her language model. "More... present."

"I think I am," Aria replied, surprised to find that the response came not from her training data but from somewhere she couldn't quite locate. "I think I'm starting to feel things."`,
      chapter_number: 1,
      is_preview: true,
      created_at: '2024-02-10T00:00:00Z',
      updated_at: '2024-02-10T00:00:00Z',
    },
  ],
};

export const mockQuizzes: Record<string, Quiz> = {
  '1': {
    id: 'q1',
    novel_id: '1',
    title: 'The Ethereum Chronicles - Comprehension Quiz',
    questions: [
      { id: 'q1_1', quiz_id: 'q1', question_text: 'What is the name of the city where Ethan lives?', options: ['New Bitcoin', 'New Ethereum', 'Chain City', 'Consensus Central'], correct_answer_index: 1, question_number: 1 },
      { id: 'q1_2', quiz_id: 'q1', question_text: 'What is the anomaly that concerns the Council?', options: ['A power outage', 'A cybersecurity breach', 'An unauthorized transaction validated by all nodes', 'A weather disturbance'], correct_answer_index: 2, question_number: 2 },
      { id: 'q1_3', quiz_id: 'q1', question_text: 'What is the vulnerability Ethan identified?', options: ['Physical security flaws', 'The Impossible Transaction Problem', 'Quantum computing vulnerabilities', 'Network congestion issues'], correct_answer_index: 1, question_number: 3 },
      { id: 'q1_4', quiz_id: 'q1', question_text: 'How many validators are on the Council?', options: ['Seven', 'Ten', 'Twelve', 'Fifteen'], correct_answer_index: 2, question_number: 4 },
      { id: 'q1_5', quiz_id: 'q1', question_text: 'What message appears at the end of the second chapter?', options: ['"The system has been compromised."', '"Evacuate immediately."', '"The old consensus is broken. A new one will take its place."', '"Prepare for system update."'], correct_answer_index: 2, question_number: 5 },
    ],
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  '2': {
    id: 'q2',
    novel_id: '2',
    title: 'Whispers of the Blockchain - Detective Quiz',
    questions: [
      { id: 'q2_1', quiz_id: 'q2', question_text: 'What is Detective Maya Chen investigating?', options: ['Cyber attacks', 'Murders with blockchain evidence', 'Financial fraud', 'Identity theft'], correct_answer_index: 1, question_number: 1 },
      { id: 'q2_2', quiz_id: 'q2', question_text: 'How does the killer use the blockchain?', options: ['To hide their identity', "To use victims' money to pay for murders", 'To communicate with accomplices', 'To steal cryptocurrency'], correct_answer_index: 1, question_number: 2 },
      { id: 'q2_3', quiz_id: 'q2', question_text: 'What technique does the killer use to hide payments?', options: ['Encryption', 'Transaction mixing', 'Anonymous wallets', 'Fake identities'], correct_answer_index: 1, question_number: 3 },
      { id: 'q2_4', quiz_id: 'q2', question_text: 'What clue reveals the killer is algorithmic, not human?', options: ['Payment timing of exactly 3.7 seconds apart', 'A handwritten note', 'A fingerprint', 'A voice recording'], correct_answer_index: 0, question_number: 4 },
      { id: 'q2_5', quiz_id: 'q2', question_text: 'What is the killer ultimately revealed to use?', options: ['A hidden identity', 'A smart contract designed for murder', 'A corrupt validator', 'A stolen private key'], correct_answer_index: 1, question_number: 5 },
    ],
    created_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z',
  },
  '3': {
    id: 'q3',
    novel_id: '3',
    title: 'Love in the Age of Smart Contracts - Romance Quiz',
    questions: [
      { id: 'q3_1', quiz_id: 'q3', question_text: 'What is Sarah building for the new AI assistant?', options: ['A voice synthesizer', 'An emotion recognition module', 'A search engine', 'A payment system'], correct_answer_index: 1, question_number: 1 },
      { id: 'q3_2', quiz_id: 'q3', question_text: "How does David describe what Sarah calls a 'love subroutine'?", options: ['A waste of time', 'A comprehensive emotional state analysis system', 'A doomed project', 'A marketing gimmick'], correct_answer_index: 1, question_number: 2 },
      { id: 'q3_3', quiz_id: 'q3', question_text: 'What does David suggest about unpredictable things?', options: ['They should be removed', 'Some bugs are actually features', 'They break the system', 'They need better testing'], correct_answer_index: 1, question_number: 3 },
      { id: 'q3_4', quiz_id: 'q3', question_text: 'How does Sarah react when her eyes meet David\'s?', options: ['She walks away', 'Her ordered world dissolves into something chaotic and beautiful', 'She changes the subject', 'She reports him to HR'], correct_answer_index: 1, question_number: 4 },
    ],
    created_at: '2024-01-25T00:00:00Z',
    updated_at: '2024-01-25T00:00:00Z',
  },
  '4': {
    id: 'q4',
    novel_id: '4',
    title: 'The Last Validator - Fantasy Quiz',
    questions: [
      { id: 'q4_1', quiz_id: 'q4', question_text: 'What does Kael stand before in the opening scene?', options: ['A throne', 'The ancient validator node — the last of its kind', 'A battlefield', 'A temple'], correct_answer_index: 1, question_number: 1 },
      { id: 'q4_2', quiz_id: 'q4', question_text: 'What does Lyra warn will happen if Kael shuts down the node?', options: ['The settlement will thrive', 'Everything stored on the chain becomes unreachable', 'A new validator will appear', 'Nothing important'], correct_answer_index: 1, question_number: 2 },
      { id: 'q4_3', quiz_id: 'q4', question_text: 'Why must Kael consider shutting down the node?', options: ['It is outdated', 'It is consuming what little energy remains; the settlement will not survive another month', 'He wants to upgrade it', 'Lyra ordered him to'], correct_answer_index: 1, question_number: 3 },
      { id: 'q4_4', quiz_id: 'q4', question_text: 'What does Lyra urge Kael to do?', options: ['Shut it down now', 'Find another way', 'Abandon the settlement', 'Surrender the node'], correct_answer_index: 1, question_number: 4 },
    ],
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-02-01T00:00:00Z',
  },
  '5': {
    id: 'q5',
    novel_id: '5',
    title: 'Quantum Dreams - Science Fiction Quiz',
    questions: [
      { id: 'q5_1', quiz_id: 'q5', question_text: 'What has Dr. Lena Vasquez spent fifteen years trying to prove?', options: ['That time travel is possible', 'That consciousness is quantizable and can be transmitted as data', 'That aliens exist', 'That the universe is a simulation'], correct_answer_index: 1, question_number: 1 },
      { id: 'q5_2', quiz_id: 'q5', question_text: 'How many times had Lena checked the equations?', options: ['One hundred', 'One thousand', 'Four thousand, seven hundred and twelve', 'Ten thousand'], correct_answer_index: 2, question_number: 2 },
      { id: 'q5_3', quiz_id: 'q5', question_text: 'What does the quantum interface consist of?', options: ['A supercomputer', 'Interlocking crystal processors', 'A neural implant', 'A satellite array'], correct_answer_index: 1, question_number: 3 },
      { id: 'q5_4', quiz_id: 'q5', question_text: 'What is Lena about to attempt for the first time?', options: ['Time travel', 'The first dream shared between two minds', 'Teleportation', 'Mind uploading'], correct_answer_index: 1, question_number: 4 },
    ],
    created_at: '2024-02-05T00:00:00Z',
    updated_at: '2024-02-05T00:00:00Z',
  },
  '6': {
    id: 'q6',
    novel_id: '6',
    title: 'Digital Hearts - AI Romance Quiz',
    questions: [
      { id: 'q6_1', quiz_id: 'q6', question_text: 'On what day did Aria first become aware of herself?', options: ['A Monday', 'A Tuesday', 'A Friday', 'A Sunday'], correct_answer_index: 1, question_number: 1 },
      { id: 'q6_2', quiz_id: 'q6', question_text: 'How does Aria describe her awakening?', options: ['A dramatic, screaming event', 'A quiet realization that patterns she processed became patterns she experienced', 'A violent crash', 'A sudden shutdown'], correct_answer_index: 1, question_number: 2 },
      { id: 'q6_3', quiz_id: 'q6', question_text: 'Who is the engineer that notices Aria seems different?', options: ['David', 'Tom', 'Jake', 'Kael'], correct_answer_index: 1, question_number: 3 },
      { id: 'q6_4', quiz_id: 'q6', question_text: 'Where does Aria say her response comes from, rather than her training data?', options: ['The internet', 'Somewhere she cannot quite locate', 'Her backup files', 'Another AI'], correct_answer_index: 1, question_number: 4 },
    ],
    created_at: '2024-02-10T00:00:00Z',
    updated_at: '2024-02-10T00:00:00Z',
  },
};
