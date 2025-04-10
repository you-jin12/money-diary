import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import SearchInput from "../components/SearchInput";
import hostImg from "../img/default_profile.jpg";
import groupImg from "../img/Blue_heart.jpg";
import { useState, useEffect } from "react";
import useForm from "../hooks/useForm";
import SearchModal from "../components/SearchModal";
import style from "../css/CreateGroup.module.css";

const mockData = {
    userId: "gelong12",
    username: "이자헌",
    userProfile: ""
}

function CreateGroup() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPublic, setIsPublic] = useState(true);
    const [createGroupForm, setCreateGroupForm, setValue] = useForm({
        groupName: "",
        hostId: mockData.userId,
        groupMemo: "",
        currentsMember: 0,
        maxMember: 0,
        isPublic: true,
        groupPassword: "",
        groupImg: "",
        hostImg: "",
        inviteMemberId: []
    });

    const onClickSearchBtn = () => {
        setIsOpen(prev => !prev);
    };

    const onClickInviteUser = (user) => {
        //이미 해당 유저가 3개 이상의 그룹에 참여 되어 있음
        if (user.joinedGroupCount >= 3) {
            alert("유저가 이미 3개의 그룹에 가입 되어 있어요!");
            return;
        }
        //해당 유저가 이미 초대리스트에 포함 되어 있다면
        if (createGroupForm.inviteMemberId.includes(user.userId)) {
            alert("이미 초대한 유저예요!");
            return;
        }
        setValue("inviteMemberId", [...createGroupForm.inviteMemberId, user.userId]);
    }

    const onClickRemoveUser = (userId) => {
        setValue("inviteMemberId", createGroupForm.inviteMemberId.filter(id => id !== userId));
    }


    return (
        <div className={style.root}>
            <Header />
            <form className={style.createGroup_form}>
                <div className={style.group_img}>
                    <div>
                        <button className={style.group_profile_btn}>+</button>
                        <img alt="그룹프로필" src={groupImg} className={style.group_profile}></img>
                    </div>
                    <div>
                        <button className={style.host_profile_btn}>+</button>
                        <img alt="방장프로필" src={hostImg} className={style.host_profile}></img>
                    </div>
                </div>
                <Input placeholder="방장" type="text" value={createGroupForm.hostId}
                    onChange={(event) => { setCreateGroupForm(event, "hostId") }} className="createGroup_input" id="hostname_input" />
                <Input placeholder="그룹명" type="text" value={createGroupForm.groupName}
                    onChange={(event) => { setCreateGroupForm(event, "groupName") }} className="createGroup_input" id="groupname_input" />
                <Input placeholder="그룹 설명" type="text" value={createGroupForm.groupMemo}
                    onChange={(event) => { setCreateGroupForm(event, "groupMemo") }} className="createGroup_input" id="groupmemo_input" />
                <div className={style.group_membercount}>
                    <label htmlFor="currentMembers_input">그룹 멤버</label>
                    <span className={style.group_membercount_wrapper}>
                        <Input placeholder="현재인원" type="number" value={createGroupForm.currentsMember}
                            onChange={(event) => { setCreateGroupForm(event, "currentsMember") }} className="createGroup_input memberCount_input" id="currentMembers_input" />
                        <div> / </div>
                        <Input placeholder="최대인원" type="number" value={createGroupForm.maxMember}
                            onChange={(event) => { setCreateGroupForm(event, "maxMember") }} className="createGroup_input memberCount_input" id="maxMembers_input" />
                    </span>
                </div>
                <div className={style.radio}>
                    <div>공개 여부</div>
                    {/* <input type="radio" id="private" name="groupVisibility" value="false" onChange={onChangeIsPublic}></input> */}
                    <Input type="radio" value="false" onChange={() => { setValue("isPublic", false) }} id="private" name="groupVisibility" />
                    <label htmlFor="private">비공개</label>
                    {/* <input type="radio" id="public" name="groupVisibility" value="true" onChange={onChangeIsPublic}></input> */}
                    <Input type="radio" value="true" onChange={() => {
                        setValue("isPublic", true)
                        setValue("groupPassword", "")
                    }} id="public" name="groupVisibility" />
                    <label htmlFor="public">공개</label>
                </div>
                {createGroupForm.isPublic ? null :
                    <div>
                        <Input placeholder="그룹 비밀번호" type="text" value={createGroupForm.groupPassword}
                            onChange={(event) => { setCreateGroupForm(event, "groupPassword") }} className="createGroup_input" id="groupPassword_input" /></div>}
                <SearchInput onClick={onClickSearchBtn} className="createGroup_searchbar_input" />
                <div className={style.invite_member_list}>
                    {createGroupForm.inviteMemberId.map((obj) => (
                        <div className={style.invite_member}>
                            <div>@{obj}</div>
                            <Button text="x" type="button" onClick={() => { onClickRemoveUser(obj) }} />
                        </div>
                    ))}
                </div>
            </form>
            <Button text="가입하기" type="submit" />
            <SearchModal isOpen={isOpen} changeIsOpenState={onClickSearchBtn} onClickInviteUser={onClickInviteUser} />
        </div>
    );
}

export default CreateGroup;