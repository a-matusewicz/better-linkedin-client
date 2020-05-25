import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';
import marked from 'marked';
import { fetchPost, updatePost, deletePost } from '../actions';

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      titleInput: '',
      contentInput: '',
      tagsInput: '',
    };
  }

  componentDidMount = () => {
    this.props.fetchPost(this.props.match.params.postID);
  }

  onPostEdit = () => {
    if (this.state.isEditing) {
      this.props.updatePost(
        Object.assign(
          this.props.currentPost,
          {
            title: this.state.titleInput,
            content: this.state.contentInput,
            tags: this.state.tagsInput,
          },
        ),
      );
    }

    this.setState(prevState => ({
      titleInput: this.props.currentPost.title,
      contentInput: this.props.currentPost.content,
      tagsInput: this.props.currentPost.tags,
      isEditing: !prevState.isEditing,
    }));
  }

  onPostDelete = () => {
    this.props.deletePost(this.props.currentPost._id, this.props.history);
  }

  renderEditButton = () => {
    if (!this.props.authenticated) return <div />;
    if (this.state.isEditing) {
      return (
        <Button variant="success" onClick={this.onPostEdit}>
          Save Post
        </Button>
      );
    } else {
      return (
        <Button variant="success" onClick={this.onPostEdit}>
          Edit Post
        </Button>
      );
    }
  }

  renderDeleteButton = () => {
    if (!this.props.authenticated) return <div />;
    return (
      <Button variant="danger" onClick={this.onPostDelete}>
        Delete
      </Button>
    );
  }

  onTitleChange = (event) => {
    this.setState({
      titleInput: event.target.value,
    });
  }

  onContentChange = (event) => {
    this.setState({
      contentInput: event.target.value,
    });
  }

  onTagsChange = (event) => {
    this.setState({
      tagsInput: event.target.value,
    });
  }

  renderPostTitle = () => {
    if (this.state.isEditing) {
      return (
        <TextareaAutosize onChange={this.onTitleChange} defaultValue={this.state.titleInput} />
      );
    } else {
      return (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: marked(this.props.currentPost.title || '') }} />
      );
    }
  }

  renderPostContent = () => {
    if (this.state.isEditing) {
      return (
        <TextareaAutosize value={this.state.contentInput} onChange={this.onContentChange} />
      );
    } else {
      return (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: marked(this.props.currentPost.content || '') }} />
      );
    }
  }

  renderPostTags = () => {
    if (this.state.isEditing) {
      return (
        <TextareaAutosize value={this.state.tagsInput} onChange={this.onTagsChange} />
      );
    } else {
      return (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: marked(this.props.currentPost.tags || '') }} />
      );
    }
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Img id="individualPostCardImage" variant="top" src={this.props.currentPost.cover_url} alt="Cover Photo" />
          <Card.Body>
            <Card.Title>
              {this.renderPostTitle()}
            </Card.Title>
            <Card.Text>
              {this.renderPostContent()}
            </Card.Text>
            <Card.Text>
              <div className="text-muted">
                Author: {this.props.currentPost.author}
              </div>
            </Card.Text>
            <Card.Text>
              <small className="text-muted">
                {this.renderPostTags()}
              </small>
            </Card.Text>
            {this.renderEditButton()}
            {this.renderDeleteButton()}
          </Card.Body>
        </Card>
      </div>
    );
  }
}

// connects particular parts of redux state to this components props
const mapStateToProps = state => (
  {
    currentPost: state.posts.current,
    authenticated: state.auth.authenticated,
  }
);

// react-redux glue -- outputs Container that know state in props
// also with an optional HOC withRouter
export default withRouter(connect(mapStateToProps, { fetchPost, updatePost, deletePost })(Post));
