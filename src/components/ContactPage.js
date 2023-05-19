import React, { useState , useCallback} from 'react';
// import emailjs from 'emailjs-com';
import './ContactPage.css';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';
import GitHubIcon from  '@mui/icons-material/GitHub';




function ContactPage() {
  const [formSent, setFormSent] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const sendEmail = async (e) => {
    e.preventDefault();
  
    try {

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_pf3lhtg',
          template_id: 'template_vpd5a1i',
          user_id: 'czMF1Ei_0OYDt7TE8',
          template_params: {
            from_name: `${name} <${email}>`,
            to_name: 'Your Alexis',
            message: message,
            reply_to: email,
          },
        }),
      });

  
      if (response.ok) {
        alert('Your message has been sent!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  const phoneNumber = '(781)809-1286';

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        alert('Phone number copied to clipboard!');
      },
      (err) => {
        console.error('Could not copy text: ', err);
      },
    );
  }, []);



  function Intro() {
    return (
      <div className="intro">
        <h1>Xinyi (Alexis) Wu</h1>
        <p>
          Passionate and dedicated engineering student with experience in machine learning, software development, and robotics. Adept at collaborating on multidisciplinary teams and contributing to innovative projects. Currently pursuing a Bachelor of Science in Engineering: Computing at Olin College of Engineering, I am looking to apply my skills in a dynamic and challenging environment.
        </p>
        <p>
          With several internships, I've had the opportunity to work on various projects, including developing a beat detection algorithm for a mini-game, building a payment fraud detection model for an e-commerce platform, and programming a remote-controlled land robot prototype. Furthermore, I've been involved in numerous academic projects and hackathons, showcasing my ability to work in diverse settings and produce innovative solutions.
        </p>
        <p>
          My technical skills include Python, machine learning with PyTorch and TensorFlow, MATLAB, Swift, ROS2, full-stack development, and computer vision. I am also proficient in Microsoft Office, Adobe Photoshop, Adobe Illustrator, Fusion 360, and Final Cut Pro X.
        </p>
      </div>
    );
  }
  


  
  return (

    <div className="contact-container">
    <div className="contact-content">
      <div className="contact-intro">
        <h2>About Me</h2>
        <p className='intro'>
          Hello, I'm Alexis Wu.
        </p>
        <p className='intro'> I am currently studying at <b>Olin College of Engineering with a focus on computer science</b>. Passionate and dedicated engineering student with experience in machine learning, software development, and robotics. Adept at collaborating on multidisciplinary teams and contributing to innovative projects. I am looking to apply my skills in a dynamic and challenging environment.</p>

      </div>
      <div className="contact-info">
      <h2>Contact Me</h2>
      <p>
        <EmailIcon /> Email:
        <a href="mailto:wuxinyi2000@gmail.com"> wuxinyi2000@gmail.com</a>
      </p>
      <p>
        <PhoneIcon /> Phone:
        <a href={`tel:${phoneNumber}`} onClick={() => copyToClipboard(phoneNumber)}>
          {' '}
          {phoneNumber}
        </a>
      </p>
      <p>
        <LinkedInIcon /> LinkedIn:
        <a href="https://www.linkedin.com/in/xinyi-alexis-wu" target="_blank" rel="noreferrer">
          {' '} Xinyi "Alexis" Wu
        </a>
      </p>
      <p>
      <PublicIcon /> Website:
      <a href="https://alexiswu.tech" target="_blank" rel="noreferrer">
        {' '} alexiswu.tech
      </a>
    </p>
    <p>
  <GitHubIcon /> GitHub:
  <a href="https://github.com/alexiswu-01" target="_blank" rel="noreferrer">
    {' '} github.com/alexiswu-01
  </a>
</p>

    </div>
    </div>
      <form className="contact-form" onSubmit={sendEmail}>
        <h3>Leave me a message:</h3>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <button type="submit">Send</button>
      </form>
      {formSent && <p>Thank you for your message! I'll get back to you soon.</p>}
    </div>
  );
}

export default ContactPage;
