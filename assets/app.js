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
                    <h1><i className="salmicon salmicon-face"></i></h1>
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
                <a href={repo.html_url} className="card card-block">
                    <h2 className="card-title h4">{repo.name}</h2>
                    <p className="card-text">{repo.description}</p>
                    <p className="card-text"><small className="text-muted">{repo.updated_at}</small></p>
                    <div className="btn-group btn-group-sm">
                        <button type="button" className="btn btn-secondary"><i className="octicon octicon-eye"></i></button>
                        <button type="button" className="btn btn-secondary">{repo.watchers_count}</button>
                    </div>
                    <div className="btn-group btn-group-sm">
                        <button type="button" className="btn btn-secondary"><i className="octicon octicon-star"></i></button>
                        <button type="button" className="btn btn-secondary">{repo.stargazers_count}</button>
                    </div>
                    <div className="btn-group btn-group-sm">
                        <button type="button" className="btn btn-secondary"><i className="octicon octicon-repo-forked"></i></button>
                        <button type="button" className="btn btn-secondary">{repo.forks}</button>
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
