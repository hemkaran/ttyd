import { Component, h } from 'preact';

import { ITerminalOptions, ITheme } from 'xterm';
import { Xterm } from './terminal';

if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require('preact/debug');
}

const url = 'ws://192.168.2.143:5000/socket.io/?EIO=3&transport=websocket';
const url2 = 'ws://localhost:7681/ws';
//const url = 'wss://serverrp9uqn5l-dev-machine-server-8000.ina.hackerrank.com/ws';
const termOptions = {
    fontSize: 13,
    fontFamily: 'Menlo For Powerline,Consolas,Liberation Mono,Menlo,Courier,monospace',
    theme: {
        foreground: '#ffffff',
        background: '#000000',
        cursor: '#adadad',
        black: '#000000',
        red: '#d81e00',
        green: '#5ea702',
        yellow: '#cfae00',
        blue: '#427ab3',
        magenta: '#89658e',
        cyan: '#00a7aa',
        white: '#dbded8',
        brightBlack: '#686a66',
        brightRed: '#f54235',
        brightGreen: '#99e343',
        brightYellow: '#fdeb61',
        brightBlue: '#84b0d8',
        brightMagenta: '#bc94b7',
        brightCyan: '#37e6e8',
        brightWhite: '#f1f1f0',
    } as ITheme,
} as ITerminalOptions;

export class App extends Component {
    private xterm: Xterm;
    private webSocketUrl: string;

    componentDidMount(): void {
        this.webSocketUrl = url;
        const container = document.querySelector('#terminal-container');
        this.xterm = new Xterm({
            url,
            options: termOptions,
            container,
        });
    }

    switchWebsocket = () => {
        if (this.webSocketUrl === url2) {
            this.webSocketUrl = url;
        } else {
            this.webSocketUrl = url2;
        }
        this.xterm.switchWebsocket(this.webSocketUrl);
    };

    render() {
        return (
            <div className="container">
                <h1 className="heading">Terminal Here</h1>
                <button onClick={this.switchWebsocket}>Switch Websockets</button>
                <div id="terminal-container" />
            </div>
        );
    }
}
