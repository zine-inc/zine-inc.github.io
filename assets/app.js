var App = React.createClass({
    getInitialState: function() {
        return {
            loading: false,
            error  : false,
            repos  : [],
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

        var url = 'https://api.github.com/orgs/zine-inc/repos';
        var xhr = $.get(url, this.gotData, 'json').fail(this.failed);
        this.setState({ error: false, loading: true, xhr: xhr });
    },
    gotData: function(data) {
        this.setState({
            loading: false,
            repos  : this.state.repos.concat(data),
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
                <header className="container text-center">
                    <h1>zine-inc.github.io</h1>
                    <p>ZINE is built on open source software. <a href="https://github.com/zine-inc/repositories">View All on GitHub</a></p>
                </header>

                <div className="container">
                    <Repos repos={this.state.repos}/>
                </div>
            </main>
        );
    }
});

var Repo = React.createClass({
    render: function() {
        var repo = this.props.repo;
        return (
            <div className="col-sm-3">
                <a href={repo.html_url} className="thumbnail">
                    <div className="caption">
                        <h2 className="h3">{repo.name}</h2>
                        <p>{repo.description}</p>
                        <ul className="h6 text-muted">
                            <li>{repo.language}</li>
                            <li>{repo.watchers_count} watchers / {repo.stargazers_count} stars / {repo.forks} forks</li>
                            <li>{repo.updated_at}</li>
                        </ul>
                    </div>
                </a>
            </div>
        );
    }
});

var Repos = React.createClass({
    render: function() {
        var rows = this.props.repos.map(function(repo) {
            return (<Repo key={repo.id} repo={repo}></Repo>);
        });

        return (
            <div className="row">{rows}</div>
        );
    }
});

ReactDOM.render(
    <App></App>,
    document.getElementById('app')
);
