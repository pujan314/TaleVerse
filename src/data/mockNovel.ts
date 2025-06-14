// Mock data for a novel with quiz
const novelData = {
  id: '1',
  title: 'The Ethereum Chronicles',
  author: 'Alex Blockman',
  authorId: '1',
  coverImage: 'https://images.pexels.com/photos/1646870/pexels-photo-1646870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  genre: 'Sci-Fi',
  rating: 4.8,
  publishDate: '2023-10-15',
  description: 'A thrilling adventure through a digital world where code is law and decentralized societies thrive. Follow the journey of a young programmer as they navigate the complex socio-political landscape of a world built on blockchain technology.',
  chapters: [
    {
      id: 'c1',
      title: 'Genesis Block',
      content: `
        <p>The city of New Ethereum sprawled beneath him, a vast network of interconnected nodes and pathways that glowed with an ethereal blue light. From his vantage point on the observation deck of the tallest spire in the central district, Ethan could see the entire ecosystem pulsing with activity.</p>
        <p>Transactions flowed like rivers of light between buildings, smart contracts executed with mathematical precision, and the subtle hum of consensus algorithms provided a constant backdrop to city life. This was home, but soon he would be leaving it all behind.</p>
        <p>"Citizen 0x7E5F3A8D," a voice called from behind him. "Your presence is required at the Council of Validators."</p>
        <p>Ethan turned to find a governance protocol avatar hovering a few feet away, its form a complex arrangement of geometric shapes that shifted and rearranged themselves continuously.</p>
        <p>"I've already submitted my testimony to the chain," Ethan replied. "What more could they want?"</p>
        <p>"New information has come to light regarding the anomaly. Your unique perspective is deemed essential to the investigation."</p>
        <p>The anomaly. Just thinking about it sent a chill through Ethan's system. Three days ago, something impossible had happened on the chain—a transaction that seemingly came from nowhere, authorized by no one, yet validated by every node in the network. The implications were staggering, threatening the very foundations of their society.</p>
        <p>And somehow, Ethan was the only one who had seen it coming.</p>
        <p>"Tell them I'll be there within the hour," he said, turning back to the cityscape. The avatar dissipated into fragments of code that quickly dispersed into the ether.</p>
        <p>As Ethan made his way to the transport hub, his personal device pinged with an incoming message. The sender was anonymous, the encryption unlike anything he'd seen before. The message contained just four words:</p>
        <p>"The Genesis Protocol begins."</p>
        <p>Ethan stopped in his tracks, suddenly aware of the weight of the small hardware wallet hanging around his neck. Inside it was a private key, one he'd been instructed never to use except in the direst circumstances.</p>
        <p>Perhaps those circumstances had finally arrived.</p>
      `
    },
    {
      id: 'c2',
      title: 'Consensus Mechanism',
      content: `
        <p>The Council of Validators convened in a vast circular chamber, where the walls consisted of constantly shifting data visualizations representing the state of the blockchain in real-time. Twelve validators sat at equal intervals around a central dais, their faces illuminated by the soft glow of their terminals.</p>
        <p>Ethan stood in the center, feeling the weight of their combined scrutiny. These were the most powerful individuals in New Ethereum, each one responsible for securing and validating massive portions of the network.</p>
        <p>"Citizen 0x7E5F3A8D," intoned the Chief Validator, an older woman whose eyes reflected the same blue light that permeated the city, "you predicted this anomaly in your research paper three years ago. At the time, your findings were dismissed as theoretical impossibilities. Now we face precisely the scenario you described. Explain yourself."</p>
        <p>The accusatory tone wasn't lost on Ethan, but he had expected as much. The Council didn't like surprises, and they liked being wrong even less.</p>
        <p>"My research identified a potential vulnerability in the consensus mechanism," Ethan explained, his voice steady despite his racing heart. "I called it the 'Impossible Transaction Problem' — a scenario where a transaction could be validated without proper authorization if certain conditions aligned perfectly."</p>
        <p>"And what conditions would those be?" asked another validator, his fingers dancing over his terminal as he presumably pulled up Ethan's old research.</p>
        <p>"A harmonic resonance in the validation algorithms. If multiple validators process transactions with precisely the right cryptographic signatures at exactly the right timestamps, it creates a kind of... echo chamber. The network begins to resonate at a frequency that can generate false confirmations."</p>
        <p>Murmurs rippled through the Council. One validator leaned forward, her expression skeptical. "You're suggesting this was an accident? A flaw in the code?"</p>
        <p>Ethan hesitated. The anonymous message burned in his mind: The Genesis Protocol begins.</p>
        <p>"No," he said finally. "I believe it was deliberate. Someone has found a way to orchestrate these conditions intentionally."</p>
        <p>Silence fell over the chamber. The Chief Validator's eyes narrowed.</p>
        <p>"And who would have both the knowledge and the resources to accomplish such a feat?" she asked, though her tone suggested she already had her suspicions.</p>
        <p>Before Ethan could answer, all the displays in the chamber flickered simultaneously. The data visualizations froze, then rearranged themselves into a single message:</p>
        <p>"The old consensus is broken. A new one will take its place."</p>
        <p>As the Council erupted into chaos, Ethan felt the hardware wallet against his chest grow inexplicably warm.</p>
      `
    }
  ],
  quiz: {
    id: 'q1',
    title: 'The Ethereum Chronicles - Comprehension Quiz',
    questions: [
      {
        id: 'q1_1',
        text: 'What is the name of the city where Ethan lives?',
        options: [
          'New Bitcoin',
          'New Ethereum',
          'Chain City',
          'Consensus Central'
        ],
        correctIndex: 1
      },
      {
        id: 'q1_2',
        text: 'What is the anomaly that concerns the Council?',
        options: [
          'A power outage',
          'A cybersecurity breach',
          'An unauthorized transaction that was validated by all nodes',
          'A weather disturbance'
        ],
        correctIndex: 2
      },
      {
        id: 'q1_3',
        text: 'What is the vulnerability Ethan identified in his research?',
        options: [
          'Physical security flaws',
          'The Impossible Transaction Problem',
          'Quantum computing vulnerabilities',
          'Network congestion issues'
        ],
        correctIndex: 1
      },
      {
        id: 'q1_4',
        text: 'How many validators are on the Council?',
        options: [
          'Seven',
          'Ten',
          'Twelve',
          'Fifteen'
        ],
        correctIndex: 2
      },
      {
        id: 'q1_5',
        text: 'What message appears at the end of the second chapter?',
        options: [
          '"The system has been compromised."',
          '"Evacuate immediately."',
          '"The old consensus is broken. A new one will take its place."',
          '"Prepare for system update."'
        ],
        correctIndex: 2
      }
    ]
  }
};

export default novelData;