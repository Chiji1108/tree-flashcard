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
    <div className="pb-16">
      <Head>
        <title>植物10</title>
        <meta name="description" content="植物10種を覚えれるWebアプリです" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <Footer current={current} max={state.length} />
      <main className="container mx-auto text-center p-6">
        <h1 className="mt-12 mb-12 text-6xl font-black">植物10</h1>
        <p>植物10種を覚えれるWebアプリです。</p>
        <p>スワイプすると他の画像を見れます。</p>
        <div className="m-6">
          <p>データ元</p>
          <Link href="http://www.chiba-museum.jp/jyumoku2014/kensaku/namae.html">
            樹木検索図鑑
          </Link>
          {", "}
          <Link href="http://plants.minibird.jp/">西宮の湿生・水生植物</Link>
        </div>
        <div className="mb-6 flex space-x-4 justify-center">
          <div>
            <Button onClick={() => dispatch({ type: "shuffle" })}>
              シャッフル
            </Button>
          </div>
          <div>
            <Button onClick={() => dispatch({ type: "reset" })}>
              リセット
            </Button>
          </div>
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
        <p>
          GitHub:{" "}
          <Link href="https://github.com/Chiji1108/tree-flashcard">
            Chiji1108/tree-flashcard
          </Link>
        </p>
      </footer>
    </div>
  );
}

const Footer = ({ current, max }) => {
  return (
    <div className="z-20 h-16 w-full fixed bottom-0 inset-x-0 flex justify-center items-center bg-blue-500">
      <p className="font-bold text-2xl text-white">
        {current} / {max}
      </p>
    </div>
  );
};
