import * as PIXI from 'pixi.js';
import { render, assets } from './Background';
import initState from '../../state';
import { noop } from '../../framework';

const mockSprites = () =>
  assets.map(({ asset }) => new PIXI.TilingSprite(PIXI.Texture.from(asset)));

describe('Background', () => {
  let state = initState({
    camera: {
      vX: 0,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    },
  });
  let sprites = mockSprites();

  const initProps = {
    canvas: document.createElement('canvas'),
    container: new PIXI.Container(),
    cameraUpdateFn: () => noop,
    nextStage: noop,
  };

  beforeEach(() => {
    state = initState({
      camera: {
        vX: 0,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
      },
    });
    sprites = mockSprites();
  });

  it('renders without modifying layer position', () => {
    render({
      initProps,
      state,
      delta: 1,
      elements: sprites,
    });
    sprites.forEach(sprite => expect(sprite.tilePosition.x).toEqual(0));
  });

  it('renders correctly if character is moving left', () => {
    state.character.vX = -3;
    render({
      initProps,
      state,
      delta: 1,
      elements: sprites,
    });
    sprites.forEach((sprite, i) =>
      expect(sprite.tilePosition.x).toEqual(-state.character.vX * assets[i].vX)
    );
  });

  it('renders correctly if character is moving right', () => {
    state.character.vX = 3;
    render({
      initProps,
      state,
      delta: 1,
      elements: sprites,
    });
    sprites.forEach((sprite, i) =>
      expect(sprite.tilePosition.x).toEqual(-state.character.vX * assets[i].vX)
    );
  });
});
