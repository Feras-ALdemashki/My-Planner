import "../style/contactForm.css";
import useForm from "../utils/useForm";
const baseUrl = import.meta.env.VITE_BASE_URL;

const ContactForm = () => {
  const { error, handleChange, handleSubmit } = useForm(
    {
      name: "",
      email: "",
      message: "",
    },
    `${baseUrl}/contact`,
    "/"
  );
  return (
    <div className="contact-form">
      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          name="name"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Your Email"
          name="email"
          onChange={handleChange}
        />
        <textarea
          placeholder="Your Message"
          rows="5"
          name="message"
          onChange={handleChange}
        ></textarea>
        <button type="submit">Send</button>
      </form>
      <p>{error}</p>
    </div>
  );
};

export default ContactForm;
