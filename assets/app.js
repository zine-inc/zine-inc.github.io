var App = React.createClass({
    getInitialState: function() {
        return {
            loading: false,
            error  : false,
            news   : [],
            xhr    : null
        };
    },
    componentWillMount: function() {
        this.load();
    },
    componentDidMount: function() {
    },
    load: function() {
        if (this.state.xhr) {
            this.state.xhr.abort();
        }

        // var url = 'https://api.github.com/repos/' + this.state.repo + '/issues?page=' + (this.state.lastLoadedPage + 1);
        // var xhr = $.get(url, this.gotData, 'json').fail(this.failed);

        this.gotData([
            {
                title : 'vaaw',
                link  : '#',
                domain: 'VAAW (vagrant-ansible-amazonlinux-wordpress)'
            },
            {
                title : 'ansible-role-wordpress',
                link  : '#',
                domain: 'Ansible Role: Wordpress'
            },
            {
                title : 'ansible-role-base',
                link  : '#',
                domain: 'Ansible Role: base'
            }
        ]);

        this.setState({
            error  : false,
            loading: true,
            xhr    : null
            // xhr    : xhr
        });
    },
    gotData: function(data) {
        this.setState({
            loading: false,
            news   : this.state.news.concat(data),
            error  : false,
            xhr    : null
        });
    },
    failed: function(xhr, status, reason) {
        this.setState({
            error: reason || true
        });
    },
    render: function() {
        return (
            <main>
                <header className="container">
                    <h1>zine-inc.github.io</h1>
                    <p>ZINE is built on open source software. <a href="https://github.com/twitter/repositories">View All on GitHub</a></p>
                </header>

                <div className="container">
                    <News news={this.state.news}/>
                </div>
            </main>
        );
    }
});

var Entry = React.createClass({
    render: function() {
        var entry = this.props.entry;
        return (
            <div className="col-sm-3">
                <a href="#" className="thumbnail">
                    <div className="caption">
                        <h3>{entry.title}</h3>
                        <p>{entry.domain}</p>
                    </div>
                </a>
            </div>
        );
    }
});

var News = React.createClass({
    render: function() {
        var rows = this.props.news.map(function(entry) {
            return (<Entry key={entry.id} entry={entry}></Entry>);
        });

        return (
            <div className="row">
                <div className="col-sm-3">
                    <div className="thumbnail">
                        <div className="caption">
                            <h3>Statistics</h3>
                            <ul>
                                <li><a href="https://github.com/twitter/repositories">3 public repos</a></li>
                                <li><a href="https://github.com/twitter?tab=members">3 members</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {rows}
            </div>
        );
    }
});

React.render(
    <App></App>,
    document.getElementById('app')
);
