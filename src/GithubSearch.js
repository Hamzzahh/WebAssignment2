import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, ListGroup } from 'react-bootstrap';

const GithubSearch = () => {
    const [username, setUsername] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [names, setNames] = useState({});

    useEffect(() => {
        const fetchNames = async () => {
            const fetchedNames = {};
            for (const profile of profiles) {
                const name = await fetchProfileName(profile.url);
                fetchedNames[profile.id] = name;
            }
            setNames(fetchedNames);
        };

        fetchNames();
    }, [profiles]);

    // const searchProfiles = async () => {
    //     try {
    //         const response = await axios.get(
    //             `https://api.github.com/search/users?q=${username}`
    //         );
    //         setProfiles(response.data.items);
    //     } catch (error) {
    //         console.error('Error fetching data', error);
    //     }
    // };

    const searchProfiles = async () => {
        try {
            const response = await axios.get(
                `https://api.github.com/search/users?q=${username}`,
                {
                    headers: {
                        Authorization: `token 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`,
                    },
                }
            );
            setProfiles(response.data.items);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };


    // const fetchProfileName = async (url) => {
    //     try {
    //         const response = await axios.get(url);
    //         return response.data.name || 'N/A';
    //     } catch (error) {
    //         console.error('Error fetching profile name', error);
    //         return 'N/A';
    //     }
    // };

    const fetchProfileName = async (url) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `token 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`,
                },
            });
            return response.data.name || 'N/A';
        } catch (error) {
            console.error('Error fetching profile name', error);
            return 'N/A';
        }
    };

    return (
        <div>
            <Form
                onSubmit={(e) => {
                    e.preventDefault();
                    searchProfiles();
                }}
            >
                <Form.Group>
                    <Form.Label>GitHub Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter GitHub username"
                    />
                </Form.Group>
                <Button type="submit">Search</Button>
            </Form>
            <ListGroup className="mt-4">
                {profiles.map((profile) => (
                    <ListGroup.Item key={profile.id}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={profile.avatar_url} />
                            <Card.Body>
                                <Card.Title>{profile.login}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    Name: {names[profile.id] || 'Loading...'}
                                </Card.Subtitle>
                                <Button href={profile.html_url} target="_blank" variant="primary">
                                    View Profile
                                </Button>
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default GithubSearch;
