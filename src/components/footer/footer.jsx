import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Link, TextField, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import './Footer.scss'; // Import the SCSS file

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = () => {
        // Implement subscription logic here
        console.log(`Subscribed with email: ${email}`);
        setEmail('');
    };

    return (
        <Box className="footer">
            <Container className="footer-container">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4} className="footer-column">
                        <Typography variant="h6">Company</Typography>
                        <Link href="#" variant="body2">About Us</Link>
                        <Link href="#" variant="body2">Careers</Link>
                        <Link href="#" variant="body2">Privacy Policy</Link>
                    </Grid>
                    <Grid item xs={12} sm={4} className="footer-column">
                        <Typography variant="h6">Customer Service</Typography>
                        <Link href="#" variant="body2">Contact Us</Link>
                        <Link href="#" variant="body2">FAQs</Link>
                        <Link href="#" variant="body2">Returns</Link>
                    </Grid>
                    <Grid item xs={12} sm={4} className="footer-column">
                        <Typography variant="h6">Follow Us</Typography>
                        <Box className="social-icons">
                            <Link href="#" aria-label="Facebook"><Facebook /></Link>
                            <Link href="#" aria-label="Twitter"><Twitter /></Link>
                            <Link href="#" aria-label="Instagram"><Instagram /></Link>
                            <Link href="#" aria-label="LinkedIn"><LinkedIn /></Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box className="subscribe-section">
                    <Typography variant="h6">Subscribe to our Newsletter</Typography>
                    <div className="subscribe-input">
                    <input type='email' placeholder='Enter your email'></input>
                        <Button variant="contained" onClick={handleSubscribe}>
                            Subscribe
                        </Button>
                    </div>
                    <Typography variant="body2" className="footer-bottom">
                        © {new Date().getFullYear()} Your Company Name. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;