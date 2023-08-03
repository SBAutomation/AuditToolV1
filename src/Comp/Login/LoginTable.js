import React from "react";
import Logo from "../../Img/Logos/SunbirdLogo.svg";
import axios from "axios";

export default function LoginTable() {
    const [data, setData] = React.useState(null);

    function Login(e) {
        e.preventDefault();
        let user = document.getElementById("user").value;
        let pass = document.getElementById("pass").value;
        let domain = document.getElementById("domain").value;

        axios
            .get(`/api?type=makes&user=${user}&pass=${pass}&domain=${domain}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });

        // fetch(`/api?type=makes&user=${user}&pass=${pass}&domain=${domain}`)
        //     .then((res) => res.json())
        //     .then((data) => setData(data.message));
        // console.log(data);
    }

    return (
        <div className="h-[30rem] w-[17.5rem] flex flex-col justify-center items-center relative bg-[rgba(16,16,16,0.68);] rounded-md">
            <form onSubmit={Login}>
                <ul className="flex flex-col gap-3 items-center">
                    <li>
                        <img
                            src={Logo}
                            alt="Sunbird Logo"
                            className="w-[13rem] h-[5rem]"
                        />
                    </li>
                    <li className="w-[15.31rem] relative table">
                        <input
                            type="text"
                            autoFocus="autofocus"
                            placeholder="Username"
                            name="user"
                            id="user"
                            className="LoginInput font-medium"
                        />
                    </li>
                    <li className="w-[15.31rem] relative table">
                        <input
                            type="text"
                            placeholder="Password"
                            name="pass"
                            id="pass"
                            className="LoginInput font-medium"
                        />
                    </li>
                    <li className="w-[15.31rem] relative table">
                        <input
                            type="text"
                            placeholder="Domain"
                            name="domain"
                            id="domain"
                            className="LoginInput font-medium"
                        />
                    </li>
                    <li>
                        <input
                            type="submit"
                            value="Login"
                            className="LoginButton mt-3 mb-8"
                        />
                    </li>
                </ul>
            </form>
            <h2 className="text-white tracking-[-.42px] border-t-[2px] pt-3 w-[80%] text-center">
                dcTrack Audit Tool
            </h2>
            <p className="text-white opacity-60 text-xs text-center px-4 py-3">
                Access to this system is prohibited unless authorized. Accessing
                programs or data unrelated to your job is prohibited.
            </p>
        </div>
    );
}
