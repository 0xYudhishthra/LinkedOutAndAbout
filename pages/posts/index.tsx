import React, { useEffect, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  useAccount,
  useNetwork,
} from "wagmi";
import { contractAddresses } from "../../constants";
import PostCard from "../../components/PostCard";
import PostCreate from "../../components/PostCreate";
import { Layout } from "../../components";

export default function Posts() {
  //start create post
  const { chain } = useNetwork();
  const currentChainId = chain?.id;

  console.log(currentChainId);

  //get contract address of Post contract based on chain id
  const postContractAddress = contractAddresses[421613].Post.contractAddress;

  //get the abi
  const postContractABI = contractAddresses[421613].Post.abi;

  //use contract write
  const {
    write: createPost,
    data,
    isLoading,
    isSuccess,
  } = useContractWrite({
    address: postContractAddress,
    abi: postContractABI,
    functionName: "createPost",
    args: ["test", 1693087235, "Blockchain"],
  });
  //end create post
  const [showCreatePost, setShowCreatePost] = useState(false);

  //   async function getLastPostId() {
  //     const data = await useContractRead(contract, "getLastPostId");

  //     console.log(data);
  //     console.log("hello");
  //   }

  function loadMorePosts() {
    console.log("load more posts");
    // getLastPostId();
  }

  function handlePostsOnScroll(e: any) {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    bottom && loadMorePosts();
  }

  useEffect(() => {
    loadMorePosts();
    // getLastPostId();
  }, []);

  //   getLastPostId();

  return (
    <Layout>
      <div className="flex flex-row justify-center">
        <div className="w-[30%]">
          <div className="bg-white/30 shadow-md p-7 mx-[15%] mt-[20%] rounded-xl">
            <div className="font-bold text-black text-xl mb-4">
              Create your post now.
            </div>
            <button
              className="bg-white/50 hover:bg-white/30 text-black font-bold py-2 px-4 rounded-xl shadow-md hover:shadow-lg duration-200"
              //   onClick={() => setShowCreatePost(true)}
              onClick={() => createPost()}
            >
              Create Post
            </button>
          </div>
        </div>
        <div
          className="w-[70%] h-screen flex flex-col gap-5 overflow-y-scroll pr-[20%] py-3 snap-y"
          onScroll={(e) => {
            handlePostsOnScroll(e);
          }}
        >
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
        <PostCreate show={showCreatePost} setShow={setShowCreatePost} />
      </div>
    </Layout>
  );
}
