import { useContext, useRef, useState } from "react";
import style from "../css/MyPage.module.css";
import Input from "../components/Input";
import Button from "../components/Button";
import useForm from "../hooks/useForm";
import userImg from "../img/default_profile.jpg";
import Toggle from "../components/Toggle";
import useValid from "../hooks/useValid";
import { userContext } from "../context/UserContext";
import { ServerRouter } from "react-router-dom";

const NEWPASSWORD_REGEX = /^[a-zA-Z0-9_!(),-]{8,16}$/;
const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]{1,10}$/;
function MyPage() {
    const { user } = useContext(userContext);
    const user_profile_preview = useRef();
    const [userForm, setUserForm, setMyPageFormValue] = useForm({
        nickName: user.nickName,
        newPassword: "",
        newPasswordCheck: "",
        joinPolicy: user.joinPolicy,
        userImg: ""
    });

    const [errMsg, setErrMsg, isValid] = useValid(
        {
            newPassword: "",
            newPasswordCheck: "",
            nickName: ""
        }, {
        newPassword: false,
        newPasswordCheck: false,
        nickName: true
    })


    function onChangeUserProfile(event) {
        const url = URL.createObjectURL(event.target.files[0]);
        setMyPageFormValue("userImg", url);
        user_profile_preview.current.setAttribute('src', url);
    }

    const onclickToggle = () => {
        setMyPageFormValue("joinPolicy", !userForm.joinPolicy);
    }


    async function onClickUpdateForm(event) {
        console.log(isValid)
        //유효성검사
        if (userForm.newPassword !== userForm.newPasswordCheck) {
            setErrMsg("newPasswordCheck", "", null, null, "비밀번호가 일치하지 않아요!", false)
            return
        }
        if (!isValid.newPassword || !isValid.newPasswordCheck || !isValid.nickName) {
            console.log(isValid)
            alert("문제가 있네요..")
            return
        }

        const request = {
            userId: user.userId,
            userName: user.userName,
            nickName: useForm.nickName,
            newPassword: userForm.newPassword,
            newPasswordCheck: userForm.newPasswordCheck,
            joinPolicy: useForm.joinPolicy,
            userImg: ""
        }
    }

    return (
        <div className={style.root}>
            <div className={style.user_form_root}>
                <form className={style.user_form}>
                    <label htmlFor="input_file">
                        <div className={style.user_profile_icon}>+</div>
                        <img ref={user_profile_preview} src={userImg} className={style.user_profile}></img>
                    </label>
                    <input type="file" accept="image/*" id="input_file" className={style.user_profile_input} onChange={onChangeUserProfile}></input>
                    <div className={style.form_wrapper}>
                        <label htmlFor="userId">아이디</label>
                        <Input type="text" value={user.userId} className="input_mypage input_mypage_userid" id="userId" disabled="false" />
                        <label htmlFor="username">이름</label>
                        <Input type="text" value={user.userName} className="input_mypage" id="username" disabled="false" />
                        <label htmlFor="userNickname">닉네임</label>
                        <Input type="text" value={userForm.nickName} onChange={(event) => {
                            setUserForm(event, "nickName")
                            setErrMsg("nickName", event.target.value, NICKNAME_REGEX, null, "사용할 수 없는 닉네임이에요!", true)
                        }} className="input_mypage" id="userNickname" />
                        {errMsg.nickName && <div>{errMsg.nickName}</div>}
                        <label htmlFor="userNewPassword">새 비밀번호</label>
                        <Input type="text" value={userForm.newPassword} onChange={(event) => {
                            setUserForm(event, "newPassword")
                            setErrMsg("newPassword", event.target.value, NEWPASSWORD_REGEX, null, "사용할 수 없는 비밀번호에요!", true)
                        }} className="input_mypage" id="userNewPassword" />
                        {errMsg.newPassword && <div>{errMsg.newPassword}</div>}
                        <label htmlFor="userNewPasswordCheck">비밀번호 확인</label>
                        <Input type="text" value={userForm.newPasswordCheck} onChange={(event) => {
                            setUserForm(event, "newPasswordCheck")
                            const condition = (value) => userForm.newPassword === (value)
                            setErrMsg("newPasswordCheck", event.target.value, null, condition, "비밀번호가 일치하지 않아요!", false)
                        }} className="input_mypage" id="userNewPasswordCheck" />
                        {errMsg.newPasswordCheck && <div>{errMsg.newPasswordCheck}</div>}
                        <div>
                            <div>그룹 바로 가입 여부</div>
                            <Toggle onClick={onclickToggle} toggle={userForm.joinPolicy} />
                        </div>
                        <Button text="수정하기" type="button" onClick={onClickUpdateForm} />
                    </div>
                </form>
                <Button text="회원탈퇴" type="button" />
            </div>
        </div>
    );
}

export default MyPage;