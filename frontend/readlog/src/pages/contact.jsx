import React from 'react';
import useUpdateTitle from '../hooks/UpdateTitle';  // Import the custom hook

function Contact() {
useUpdateTitle("Contact Us");

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                <p>
                    We would love to hear from you! Whether you have questions, feedback, or suggestions, feel free to reach out to us through the form below or via our social media channels.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <div className="mb-4">
                    <h3 className="font-semibold">Email:</h3>
                    <p>support@readlog.com</p>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold">Phone:</h3>
                    <p>(123) 456-7890</p>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold">Follow Us:</h3>
                    <p>
                        <a href="https://facebook.com/readlog" className="text-blue-500">Facebook</a> | 
                        <a href="https://twitter.com/readlog" className="text-blue-500"> Twitter</a> | 
                        <a href="https://instagram.com/readlog" className="text-blue-500"> Instagram</a>
                    </p>
                </div>
            </section>

            <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-4">Contact Form</h2>
                <form className="flex flex-col space-y-4">
                    <div>
                        <label className="block mb-2" htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            className="w-full p-2 border rounded" 
                            placeholder="Your Name" 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full p-2 border rounded" 
                            placeholder="Your Email" 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block mb-2" htmlFor="message">Message</label>
                        <textarea 
                            id="message" 
                            className="w-full p-2 border rounded" 
                            rows="5" 
                            placeholder="Your Message" 
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Send Message
                    </button>
                </form>
            </section>
        </div>
    );
}

export default Contact;
