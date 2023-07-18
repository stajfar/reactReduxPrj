import React from 'react';
import { Link } from 'react-router-dom';


import { useSelector } from 'react-redux';
import { useAppDispatch } from './app/store';
import { getTestCounter, increaseTestCounter } from './features/posts/PostsSlice'

function Nav({ search, setSearch }: any) {

    const dispatch = useAppDispatch();
    const count = useSelector(getTestCounter);

    return (
        <nav className="Nav">
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="search">Search</label>
              <input
                  id="search"
                  type="text"
                  placeholder="Search Post"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
              />
            </form>
            <ul>
                <li><Link to="/" >Home</Link></li>
                <li><Link to="about" >About</Link></li>
                <li><Link to="post2" >New Post</Link></li>
            </ul>

            <button onClick={() => dispatch(increaseTestCounter())}>{count}</button>
      </nav>
  );
}

export default Nav;