import "./App.css";
import React from "react";
import Login from "./Comp/Login/Login";
import "./Styles/Login.css";

function App() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/model?type=makes&user=admin&pass=sunbird")
            .then((res) => res.json())
            .then((data) => setData(JSON.parse(data.message)));
        console.log(JSON.parse(data));
    }, []);

    return (
        <div className="h-full">
            <Login />
            {/* <button onClick={() => console.log(data)}>Click me</button>
                <p>Make</p> */}
            {/* {
                    <div>
                        <table>
                            <li>
                                {!data
                                    ? "Loading..."
                                    : data.map((items, index) => {
                                          return (
                                              <ViewMake
                                                  name={items.makeName}
                                                  id={items.makeId}
                                                  key={index}
                                              />
                                          );
                                      })}
                            </li>
                        </table>
                    </div>
                } */}
        </div>
    );
}

export default App;
