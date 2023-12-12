import React, { Component } from 'react';
import Header from './HeaderComponent';
import Slider from './Slider';
import Home from './HomeComponent';
import { Route, Routes } from 'react-router';
import Post from './SinglepostComponenet';
import Posts from './postComponent';
import Podcasts from './podcastComponent';
import Podcast from './SinglepodcastComponent';
import Courses from './CoursCmponent';
import Cours from './SinglecourseComponenet';
import Login from './Login';
import Dashboard from './Dashboard';
import Intern from './SingleInternComponent';
import Register from './RegisterComponent';
import Todo from './Todo';


class Main extends Component {

    render() {
        return (
            <div className='container'>
                <Routes >
                    {/* <Route path='/' element={<Home />} /> */}
                    <Route path='/' element={<Todo />} />
                    <Route path='/posts' element={<Posts />} />
                    <Route path="/post">
                        <Route path=":postid" element={<Post />} />
                    </Route>
                    <Route path='/podcasts' element={<Podcasts />} />
                    <Route path="/podcast">
                        <Route path=":podcastid" element={<Podcast />} />
                    </Route>
                    <Route path='/courses' element={<Courses />} />
                    <Route path="/cours">
                        <Route path=":coursid" element={<Cours />} />
                    </Route>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path="/dashboard">
                        <Route path=":username" element={<Dashboard />} />
                    </Route>
                    <Route path="/intern">
                        <Route path=":internid" element={<Intern />} />
                    </Route>
                </Routes>
            </div>
        );
    }
}
export default Main;