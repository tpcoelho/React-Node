import React from 'react';
import Auth from '../modules/Auth';
import Home from '../components/Home.js';
import ListStory from '../components/ListStory.js';
import ListComment from '../components/ListComment.js';

import axios from 'axios';

class HomePage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
        topStoriesIds: [],
        storiesList: [],
        series: [1, 2, 3, 4, 5],
        selectedSeries: '1',
        commentList: [],
        commentList2: [],
        open: false,
        currentItem: 0

      };
    this.selectSeries = this.selectSeries.bind(this);
    this.topStoriesIds;
  }

  componentWillMount() {
     this.getData();
  } 

  componentDidMount() {
  }

  getData(){
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => {
        this.topStoriesIds = res.data;
        for(var i= 0 ; i<10 ; i++){
          axios.get('https://hacker-news.firebaseio.com/v0/item/'+this.topStoriesIds[i]+'.json').then(item => {
            const newItem = {
              id: item.data.id,
              title: item.data.title,
              score: item.data.score,
              numberComment: item.data.kids ? item.data.kids.length : 0,
              time: new Date(item.data.time*1000).toLocaleString(),
              autor: item.data.by,
              url: item.data.url,
              commentsIds: item.data.kids,
              comments: []
            }
            this.state.storiesList.push(newItem);
            this.setState({ storiesList: this.state.storiesList });

            if(item.data.kids){
              const end = item.data.kids.length;
              for(var y= 0 ; y < end ; y++){
                var teste = item.data.id
                axios.get('https://hacker-news.firebaseio.com/v0/item/'+item.data.kids[y]+'.json').then(item2 => {
                  const newComment = {
                    id: item2.data.id,
                    text: item2.data.text,
                    time: new Date(item2.data.time*1000).toLocaleString(),
                    autor: item2.data.by,
                    parent: item2.data.parent
                  }

                  this.state.commentList.push(newComment);
                  this.setState({ commentList: this.state.commentList });

                  this.state.commentList2.push(newComment);
                  this.setState({ commentList2: this.state.commentList2 });
                  newItem.comments.push(newComment);
                  
                });
              }
            }

          });
        }

    });
  }

//get 10 items from the index
  getDataFilter(index){
    axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => {
        this.topStoriesIds = res.data;
        this.state.storiesList = [];

        let end = Number(index)*10;
        let begin = end-10;
        for(var i = begin ; i< end ; i++){
          axios.get('https://hacker-news.firebaseio.com/v0/item/'+this.topStoriesIds[i]+'.json').then(item => {
            const newItem = {
              id: item.data.id,
              title: item.data.title,
              score: item.data.score,
              numberComment: item.data.kids ? item.data.kids.length : 0,
              time: new Date(item.data.time*1000).toLocaleString(),
              autor: item.data.by,
              url: item.data.url,
              commentsIds: item.data.kids,
              comments: []
            }
            this.state.storiesList.push(newItem);
            this.setState({ storiesList: this.state.storiesList });
            
            if(item.data.kids){
              const end = item.data.kids.length;
              for(var y= 0 ; y < end ; y++){
                var teste = item.data.id
                axios.get('https://hacker-news.firebaseio.com/v0/item/'+item.data.kids[y]+'.json').then(item2 => {
                  const newComment = {
                    id: item2.data.id,
                    text: item2.data.text,
                    time: new Date(item2.data.time*1000).toLocaleString(),
                    autor: item2.data.by,
                    parent: item2.data.parent
                  }

                  this.state.commentList.push(newComment);
                  this.setState({ commentList: this.state.commentList });

                  this.state.commentList2.push(newComment);
                  this.setState({ commentList2: this.state.commentList2 });
                  newItem.comments.push(newComment);
                  
                });
              }
            }
          });
        }
    });
  }


  filterComment(id, item){

    if(this.state.open === false){
      this.setState({ open: true });
      this.setState({ currentItem: id });
    this.state.commentList2 = [];

      for(var a=0; a<this.state.commentList.length;a++){
        if(this.state.commentList[a].parent === item.id){
          this.state.commentList2.push(this.state.commentList[a]);
        }
      }
      this.setState({ commentList2: this.state.commentList2 });
    }else if(this.state.open === true && this.state.currentItem === id){
      this.setState({ open: false });
    }else{
      this.setState({ open: true });

      alert("You have a comment opened, you need close first to visualize this one!");
    }
    

  }
  goToUrl(link){
    if(link){
      window.location.assign(link);
    }
  }

  selectSeries(e) {
    //Need more elegant way than e.target.textContent
    if (this.state.selectedSeries === e.target.textContent) return;

    this.setState({
      selectedSeries: e.target.textContent,
    });
    this.getDataFilter(e.target.textContent);
  }

  renderListStories() {
    const { storiesList } = this.state;
    return storiesList.map((item, i) => {
      return (
        <ListStory
          key = {item.id}
          open = {this.state.open}
          clickHandler ={() => this.goToUrl(item.url)}
          nastedComment ={this.renderListComments(i)}
          filterComment ={() => this.filterComment(i, item)}
          {...item}
        />
      );
    });
  }

  renderListComments(number) {
    var list ;
   list  = this.state.commentList2;

    return list.map((item, i) => {
      return (
         <ListComment
          key = {item.id}
          {...item}
        />
      );
    });
  }
  /**
   * Render the component.
   */
  render() {
    return (<Home 
      renderListStories= {this.renderListStories()}
      selectedSerie={this.state.selectedSeries}
      selectSeries={this.selectSeries}
      />);
  }

}


export default HomePage;