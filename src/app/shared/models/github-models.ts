export interface User {
    login: string;
    id: number;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface Label {
    id: number;
    url: string;
    name: string;
    color: string;
    default: boolean;
}

export interface PullRequest {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
}

export interface Issue {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    number: number;
    title: string;
    user: User;
    labels: Label[];
    state: string;
    locked: boolean;
    assignee: User;
    assignees: User[];
    milestone?: any;
    comments: number;
    created_at: Date;
    updated_at: Date;
    closed_at?: any;
    author_association: string;
    pull_request: PullRequest;
    body: string;
    closed_by: User;
}

//comments

export interface Comment {
    url: string;
    html_url: string;
    issue_url: string;
    id: number;
    user: User;
    created_at: Date;
    updated_at: Date;
    author_association: string;
    body: string;
}

//repository

export interface GithubRepository {
    id: number;
    name: string;
    full_name: string;
    owner: User;
    private: boolean;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: Date;
    updated_at: Date;
    pushed_at: Date;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    forks_count: number;
    mirror_url?: any;
    archived: boolean;
    open_issues_count: number;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
    organization: User;
    network_count: number;
    subscribers_count: number;
}