import Head from "next/head";
import GridItem from "../components/GridItem";
import Grid from "../components/Grid";
import trees from "../data/trees.json";
import { Reducer, useMemo, useReducer, useState } from "react";
import shuffle from "../utils/shuffle";
import Link from "../components/Link";
import Button from "../components/Button";

const initialState = trees.map((tree) => ({
  data: tree,
  isFlipped: false,
  isDone: false,
}));

type Store = typeof initialState;
type ActionType =
  | { type: "flip"; payload: { name: string } }
  | { type: "done"; payload: { name: string } }
  | { type: "shuffle" }
  | { type: "reset" };

const reducer: Reducer<Store, ActionType> = (state, action) => {
  switch (action.type) {
    case "flip":
      return state.map((el) => {
        if (el.data.name === action.payload.name) {
          el.isFlipped = !el.isFlipped;
        }
        return el;
      });
    case "done":
      return state.map((el) => {
        if (el.data.name === action.payload.name) {
          el.isDone = !el.isDone;
        }
        return el;
      });
    case "shuffle":
      return shuffle([...state]);
    case "reset":
      return [...initialState];
  }
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const current = useMemo(() => state.filter((el) => el.isDone).length, [
    state,
  ]);

  return (
    //TODO : bg-gray-100
    <div className="relative">
      <Head>
        {/* TODO: */}
        <title>植物10</title>
        <meta name="description" content="植物10種を覚えれるWebアプリです" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <Footer current={current} max={state.length} />
      <main className="container mx-auto text-center p-6 flex-col justify-center">
        <h1 className="mt-12 mb-6 text-6xl font-black">植物10</h1>
        <p className="m-6">
          データ元:{" "}
          <Link href="http://www.chiba-museum.jp/jyumoku2014/kensaku/namae.html">
            樹木検索図鑑
          </Link>
          {" & "}
          <Link href="http://plants.minibird.jp/">西宮の湿生・水生植物</Link>
        </p>
        <div className="mb-6 flex space-x-6">
          <Button onClick={() => dispatch({ type: "shuffle" })}>
            シャッフル
          </Button>
          <Button onClick={() => dispatch({ type: "reset" })}>リセット</Button>
        </div>

        <Grid>
          {state.map((tree) => (
            <GridItem
              key={tree.data.name}
              {...tree}
              onFlippedChange={() =>
                dispatch({ type: "flip", payload: { name: tree.data.name } })
              }
              onDoneChange={() =>
                dispatch({ type: "done", payload: { name: tree.data.name } })
              }
            />
          ))}
        </Grid>
      </main>
      <footer className="flex flex-col items-center justify-center p-4 mt-4">
        <p>created by 千々岩</p>
        <p>
          Twitter: <Link href="https://twitter.com/Chijidosu">@Chijidosu</Link>
        </p>
        {/* TODO: github link */}
      </footer>
    </div>
  );
}

const Footer = ({ current, max }) => {
  return (
    <div className="h-32 absolute inset-x-0 bottom-0 flex justify-center items-center bg-blue-500">
      <p className="font-bold text-2xl text-white">
        {current} / {max}
      </p>
    </div>
  );
};
