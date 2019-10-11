import React, { Component } from 'react'
import './App.css';
import Pusher from 'pusher-js';

export default class App1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userMessage: '',
            conversation: [],
        }
    }
    componentDidMount = () => {
        const pusher = new Pusher('<4007f64b572c4a57f633>', {
            cluster: '<ap2>',
            encrypted: true,
        });
        const channel = pusher.subscribe('chatapp');
        channel.bind('chatapp-responce', data => {
            const msg = {
                text: data.message,
                user: 'ai',
            };
            this.setState({
                conversation: [...this.state.conversation, msg],
            })
        })
    }

    onChangeHandle = (e) => {
        console.log(e.target.value);
        this.setState({ userMessage: e.target.value })
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.userMessage.trim()) return;

        const msg = {
            text: this.state.userMessage,
            user: 'human'
        };
        this.setState({
            conversation: [...this.state.conversation, msg],
        });
        fetch('http://localhost:4000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: this.state.userMessage,
            }),
        });
        this.setState({
            userMessage: ''
        })
    }

    render() {
        const chatBubble = (text, i, className) => {
            return (
                <div key={`${className}-${i}`} className={`${className} chat-babbel`}>
                    <span className='chat-content'>{text}</span>
                </div>

            );
        };
        const chat = this.state.conversation.map((e, index) =>
            chatBubble(e.text, index, e.index)
        );
        return (
            <div>
                <h1>ChatApp</h1>
                <div className='chat-window'>
                    <div className='conversation-view'>{chat}</div>
                    <div className='massage-box'>
                        <form onSubmit={this.onSubmit}>
                            <input
                                value={this.state.userMessage}
                                onInput={this.onChangeHandle}
                                className='text-input'
                                type='text'
                                autoFocus
                                placeholder="Type your message and hit Enter to send" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
