/*
  # Add sample data for demonstration

  1. Sample Novels
    - Creates 6 sample novels without author profiles
    - Uses placeholder author names and IDs
    - Includes various genres and proper data structure

  2. Sample Chapters
    - Adds chapters for the sample novels
    - Includes preview and full chapters
    - Provides rich content for reading experience

  3. Sample Quizzes
    - Creates quizzes for novels
    - Adds comprehension questions with multiple choice answers
    - Sets up reward system for quiz completion

  Note: Author profiles will be created when real users sign up and publish content.
  This migration focuses on providing sample content for users to read and interact with.
*/

-- Insert sample novels with placeholder author data
DO $$
DECLARE
    ethereum_novel_id uuid := gen_random_uuid();
    blockchain_novel_id uuid := gen_random_uuid();
    smart_contracts_novel_id uuid := gen_random_uuid();
    last_validator_novel_id uuid := gen_random_uuid();
    quantum_dreams_novel_id uuid := gen_random_uuid();
    digital_hearts_novel_id uuid := gen_random_uuid();
    quiz_id uuid;
BEGIN
    -- Insert sample novels with NULL author_id (since we can't create fake auth users)
    INSERT INTO novels (id, title, description, author_id, author_name, cover_image, genre, rating, price, is_published, total_chapters) VALUES
    (
      ethereum_novel_id,
      'The Ethereum Chronicles',
      'A thrilling adventure through a digital world where code is law and decentralized societies thrive. Follow the journey of a young programmer as they navigate the complex socio-political landscape of a world built on blockchain technology.',
      NULL,
      'Alex Blockman',
      'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=600',
      'Science Fiction',
      4.8,
      0,
      true,
      2
    ),
    (
      blockchain_novel_id,
      'Whispers of the Blockchain',
      'A detective story set in 2040 where crimes leave traces on an immutable ledger. Detective Maya must solve a murder case using blockchain forensics in a world where privacy and transparency collide.',
      NULL,
      'Maya Satoshi',
      'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=600',
      'Mystery',
      4.5,
      5,
      true,
      3
    ),
    (
      smart_contracts_novel_id,
      'Love in the Age of Smart Contracts',
      'When two engineers fall in love, they discover that relationships are more complex than any algorithm. A romantic comedy about finding human connection in an increasingly automated world.',
      NULL,
      'Sophia Merkle',
      'https://images.pexels.com/photos/9638689/pexels-photo-9638689.jpeg?auto=compress&cs=tinysrgb&w=600',
      'Romance',
      4.7,
      3,
      true,
      4
    ),
    (
      last_validator_novel_id,
      'The Last Validator',
      'In a world where computation is scarce, one person holds the key to validating the final block. An epic fantasy about power, responsibility, and the weight of being the last guardian of truth.',
      NULL,
      'James Buterin',
      'https://images.pexels.com/photos/7034127/pexels-photo-7034127.jpeg?auto=compress&cs=tinysrgb&w=600',
      'Fantasy',
      4.9,
      10,
      true,
      5
    ),
    (
      quantum_dreams_novel_id,
      'Quantum Dreams',
      'In a world where consciousness can be digitized and dreams can be shared, a young scientist discovers that reality itself might be just another layer of simulation.',
      NULL,
      'Alice Quantum',
      'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=600',
      'Science Fiction',
      4.6,
      7,
      true,
      6
    ),
    (
      digital_hearts_novel_id,
      'Digital Hearts',
      'A romance between an AI and a human in a world where the line between artificial and authentic emotions becomes increasingly blurred.',
      NULL,
      'Cyber Romeo',
      'https://images.pexels.com/photos/8566474/pexels-photo-8566474.jpeg?auto=compress&cs=tinysrgb&w=600',
      'Romance',
      4.4,
      4,
      true,
      3
    );

    -- Insert chapters for The Ethereum Chronicles
    INSERT INTO chapters (novel_id, title, content, chapter_number, is_preview) VALUES
    (
      ethereum_novel_id,
      'Genesis Block',
      'The city of New Ethereum sprawled beneath him, a vast network of interconnected nodes and pathways that glowed with an ethereal blue light. From his vantage point on the observation deck of the tallest spire in the central district, Ethan could see the entire ecosystem pulsing with activity.

Transactions flowed like rivers of light between buildings, smart contracts executed with mathematical precision, and the subtle hum of consensus algorithms provided a constant backdrop to city life. This was home, but soon he would be leaving it all behind.

"Citizen 0x7E5F3A8D," a voice called from behind him. "Your presence is required at the Council of Validators."

Ethan turned to find a governance protocol avatar hovering a few feet away, its form a complex arrangement of geometric shapes that shifted and rearranged themselves continuously.

"I''ve already submitted my testimony to the chain," Ethan replied. "What more could they want?"

"New information has come to light regarding the anomaly. Your unique perspective is deemed essential to the investigation."

The anomaly. Just thinking about it sent a chill through Ethan''s system. Three days ago, something impossible had happened on the chain—a transaction that seemingly came from nowhere, authorized by no one, yet validated by every node in the network. The implications were staggering, threatening the very foundations of their society.

And somehow, Ethan was the only one who had seen it coming.

"Tell them I''ll be there within the hour," he said, turning back to the cityscape. The avatar dissipated into fragments of code that quickly dispersed into the ether.

As Ethan made his way to the transport hub, his personal device pinged with an incoming message. The sender was anonymous, the encryption unlike anything he''d seen before. The message contained just four words:

"The Genesis Protocol begins."

Ethan stopped in his tracks, suddenly aware of the weight of the small hardware wallet hanging around his neck. Inside it was a private key, one he''d been instructed never to use except in the direst circumstances.

Perhaps those circumstances had finally arrived.',
      1,
      true
    ),
    (
      ethereum_novel_id,
      'Consensus Mechanism',
      'The Council of Validators convened in a vast circular chamber, where the walls consisted of constantly shifting data visualizations representing the state of the blockchain in real-time. Twelve validators sat at equal intervals around a central dais, their faces illuminated by the soft glow of their terminals.

Ethan stood in the center, feeling the weight of their combined scrutiny. These were the most powerful individuals in New Ethereum, each one responsible for securing and validating massive portions of the network.

"Citizen 0x7E5F3A8D," intoned the Chief Validator, an older woman whose eyes reflected the same blue light that permeated the city, "you predicted this anomaly in your research paper three years ago. At the time, your findings were dismissed as theoretical impossibilities. Now we face precisely the scenario you described. Explain yourself."

The accusatory tone wasn''t lost on Ethan, but he had expected as much. The Council didn''t like surprises, and they liked being wrong even less.

"My research identified a potential vulnerability in the consensus mechanism," Ethan explained, his voice steady despite his racing heart. "I called it the ''Impossible Transaction Problem'' — a scenario where a transaction could be validated without proper authorization if certain conditions aligned perfectly."

"And what conditions would those be?" asked another validator, his fingers dancing over his terminal as he presumably pulled up Ethan''s old research.

"A harmonic resonance in the validation algorithms. If multiple validators process transactions with precisely the right cryptographic signatures at exactly the right timestamps, it creates a kind of... echo chamber. The network begins to resonate at a frequency that can generate false confirmations."

Murmurs rippled through the Council. One validator leaned forward, her expression skeptical. "You''re suggesting this was an accident? A flaw in the code?"

Ethan hesitated. The anonymous message burned in his mind: The Genesis Protocol begins.

"No," he said finally. "I believe it was deliberate. Someone has found a way to orchestrate these conditions intentionally."

Silence fell over the chamber. The Chief Validator''s eyes narrowed.

"And who would have both the knowledge and the resources to accomplish such a feat?" she asked, though her tone suggested she already had her suspicions.

Before Ethan could answer, all the displays in the chamber flickered simultaneously. The data visualizations froze, then rearranged themselves into a single message:

"The old consensus is broken. A new one will take its place."

As the Council erupted into chaos, Ethan felt the hardware wallet against his chest grow inexplicably warm.',
      2,
      false
    );

    -- Insert chapters for Whispers of the Blockchain
    INSERT INTO chapters (novel_id, title, content, chapter_number, is_preview) VALUES
    (
      blockchain_novel_id,
      'Digital Footprints',
      'Detective Maya Chen stared at the holographic display floating above her desk, watching transaction patterns flow like digital blood through the city''s blockchain arteries. Every purchase, every contract, every micro-payment left its mark on the immutable ledger that had become the foundation of society.

"Another body," her partner Jake announced, materializing beside her desk with that particular blend of exhaustion and caffeine that defined their profession. "Same MO as the others."

Maya minimized the display with a gesture. "Let me guess—no physical evidence, no witnesses, and the only trace is a suspicious transaction pattern?"

"You''re getting good at this," Jake said, but his smile didn''t reach his eyes. "Victim is Dr. Sarah Kim, blockchain researcher at the University. Found in her apartment this morning, no signs of struggle."

Maya was already pulling up Dr. Kim''s transaction history, her fingers dancing through the air as she navigated the three-dimensional data space. "Look at this," she said, highlighting a series of micro-transactions from the past week. "Same pattern as the other victims—small, seemingly random payments to different wallets, but if you trace the ultimate destination..."

"They all lead back to the same anonymous address," Jake finished. "Our killer is using the victims'' own money to pay for their murders."

The elegance of it was disturbing. In a world where every financial transaction was recorded forever, the killer had found a way to hide in plain sight, using the very transparency of the blockchain to create the perfect alibi.',
      1,
      true
    ),
    (
      blockchain_novel_id,
      'The Trail Goes Cold',
      'Maya spent the next three hours diving deeper into the blockchain, following the digital breadcrumbs that the killer had left behind. Each transaction was perfectly legal, perfectly normal—a coffee purchase here, a ride share payment there, a small donation to charity. But when viewed as a whole, they painted a picture of something far more sinister.

"The killer is using a technique called transaction mixing," she explained to Jake, who was nursing his fourth cup of coffee and looking increasingly bewildered by the technical details. "They''re breaking up the payment into hundreds of tiny transactions, routing them through different wallets, making it nearly impossible to trace."

"Nearly impossible," Jake repeated. "But not completely impossible?"

Maya smiled grimly. "That''s where they made their mistake. They''re using a pattern—the same timing intervals, the same transaction amounts. It''s subtle, but it''s there."

She highlighted a series of transactions on the holographic display. "Look at this. Every payment is made exactly 3.7 seconds apart. That''s not human behavior—that''s algorithmic."

"So our killer is using a bot?"

"More than that," Maya said, her excitement growing. "They''re using a smart contract. And smart contracts leave traces."',
      2,
      false
    ),
    (
      blockchain_novel_id,
      'The Smart Contract Killer',
      'The smart contract was elegant in its simplicity. Maya had seen thousands of contracts in her career, but this one was different—it was designed specifically for murder.

"It''s like a digital hitman," she explained to the Chief of Police, who was struggling to understand how code could kill people. "The contract accepts payment, waits for confirmation of the target''s death, and then distributes the funds to the killer."

"But how does it know when someone is dead?" the Chief asked.

"Death certificates are recorded on the blockchain now," Maya replied. "The contract just waits for the official record to be updated, then executes the payment."

The Chief shook his head in disbelief. "So the killer is using the victim''s own money to pay for their murder, and the blockchain itself is acting as the middleman?"

"Exactly. And because smart contracts are immutable, once the contract is deployed, even the killer can''t stop it. It''s the perfect crime—except for one thing."

"What''s that?"

Maya smiled. "The killer had to deploy the contract from somewhere. And that transaction is recorded forever."',
      3,
      false
    );

    -- Insert chapters for Love in the Age of Smart Contracts
    INSERT INTO chapters (novel_id, title, content, chapter_number, is_preview) VALUES
    (
      smart_contracts_novel_id,
      'Algorithm of the Heart',
      'Sarah''s fingers hovered over the keyboard, the cursor blinking mockingly in the empty function definition. She was supposed to be coding the emotion recognition module for the new AI assistant, but her own emotions were proving far more complex than any algorithm she''d ever written.

"Still working on the love subroutine?" David''s voice made her jump. He stood in the doorway of her cubicle, holding two cups of coffee and wearing that crooked smile that made her compiler crash every time.

"It''s not a love subroutine," she protested, accepting the coffee gratefully. "It''s a comprehensive emotional state analysis system with applications in customer service, therapy, and—"

"And dating apps," David finished, settling into the chair beside her. "Come on, Sarah. Half the team knows you''re trying to solve the relationship compatibility problem with machine learning."

She felt her cheeks warm. "Maybe. Is that so wrong? I mean, if we can predict market trends and weather patterns, why not romantic compatibility?"

David leaned closer to look at her screen, and Sarah caught a whiff of his cologne—something clean and algorithmic, like fresh code and possibility. "Because," he said softly, "some things are meant to be unpredictable. Some bugs are actually features."

Their eyes met, and for a moment, Sarah''s carefully ordered world of functions and variables dissolved into something far more chaotic and beautiful.',
      1,
      true
    );

    -- Insert quiz for The Ethereum Chronicles
    INSERT INTO quizzes (novel_id, title) VALUES
    (
      ethereum_novel_id,
      'The Ethereum Chronicles - Comprehension Quiz'
    ) RETURNING id INTO quiz_id;

    -- Insert quiz questions
    INSERT INTO quiz_questions (quiz_id, question_text, options, correct_answer_index, question_number) VALUES
    (
      quiz_id,
      'What is the name of the city where Ethan lives?',
      ARRAY['New Bitcoin', 'New Ethereum', 'Chain City', 'Consensus Central'],
      1,
      1
    ),
    (
      quiz_id,
      'What is the anomaly that concerns the Council?',
      ARRAY['A power outage', 'A cybersecurity breach', 'An unauthorized transaction that was validated by all nodes', 'A weather disturbance'],
      2,
      2
    ),
    (
      quiz_id,
      'What is the vulnerability Ethan identified in his research?',
      ARRAY['Physical security flaws', 'The Impossible Transaction Problem', 'Quantum computing vulnerabilities', 'Network congestion issues'],
      1,
      3
    ),
    (
      quiz_id,
      'How many validators are on the Council?',
      ARRAY['Seven', 'Ten', 'Twelve', 'Fifteen'],
      2,
      4
    ),
    (
      quiz_id,
      'What message appears at the end of the second chapter?',
      ARRAY['"The system has been compromised."', '"Evacuate immediately."', '"The old consensus is broken. A new one will take its place."', '"Prepare for system update."'],
      2,
      5
    );

    -- Insert quiz for Whispers of the Blockchain
    INSERT INTO quizzes (novel_id, title) VALUES
    (
      blockchain_novel_id,
      'Whispers of the Blockchain - Detective Quiz'
    ) RETURNING id INTO quiz_id;

    -- Insert quiz questions for blockchain novel
    INSERT INTO quiz_questions (quiz_id, question_text, options, correct_answer_index, question_number) VALUES
    (
      quiz_id,
      'What is Detective Maya Chen investigating?',
      ARRAY['Cyber attacks', 'Murders with blockchain evidence', 'Financial fraud', 'Identity theft'],
      1,
      1
    ),
    (
      quiz_id,
      'How does the killer use the blockchain?',
      ARRAY['To hide their identity', 'To use victims'' money to pay for murders', 'To communicate with accomplices', 'To steal cryptocurrency'],
      1,
      2
    ),
    (
      quiz_id,
      'What technique does the killer use to hide payments?',
      ARRAY['Encryption', 'Transaction mixing', 'Anonymous wallets', 'Fake identities'],
      1,
      3
    );

END $$;