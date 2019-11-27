import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const clone = (board) => {
    return JSON.parse(JSON.stringify(board));
};

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        activeGame: {
            board: [],
            undoStack: [],
            redoStack: [],
        },
        games: [
            {
                difficulty: 'easy',
                size: 9,
                puzzle: [
                    { x: 0, y: 2, type: 'water' },
                    { x: 2, y: 4, type: 'water' },
                    { x: 4, y: 6, type: 'water' },
                    { x: 5, y: 2, type: 'ship_bottom' },
                    { x: 8, y: 1, type: 'water' },
                ],
                solution: [
                    { x: 0, y: 6, type: 'ship_top' },
                    { x: 0, y: 8, type: 'ship_single' },
                    { x: 1, y: 6, type: 'ship' },
                    { x: 2, y: 0, type: 'ship_left' },
                    { x: 2, y: 1, type: 'ship' },
                    { x: 2, y: 2, type: 'ship' },
                    { x: 2, y: 3, type: 'ship_right' },
                    { x: 2, y: 6, type: 'ship_bottom' },
                    { x: 2, y: 8, type: 'ship_single' },
                    { x: 2, y: 8, type: 'ship_single' },
                    { x: 4, y: 2, type: 'ship_top' },
                    { x: 4, y: 8, type: 'ship_single' },
                    { x: 5, y: 2, type: 'ship_bottom' },
                    { x: 6, y: 4, type: 'ship_top' },
                    { x: 6, y: 6, type: 'ship_top' },
                    { x: 6, y: 8, type: 'ship_top' },
                    { x: 7, y: 1, type: 'ship_single' },
                    { x: 7, y: 4, type: 'ship_bottom' },
                    { x: 7, y: 6, type: 'ship' },
                    { x: 7, y: 8, type: 'ship_bottom' },
                    { x: 8, y: 6, type: 'ship_bottom' },
                ],
                shipsRows: [2, 1, 6, 0, 2, 1, 3, 4, 1],
                shipsColumns: [1, 2, 3, 1, 2, 0, 6, 0, 5],
                ships: [
                    { size: 1, count: 4 },
                    { size: 2, count: 3 },
                    { size: 3, count: 2 },
                    { size: 4, count: 1 },
                ],
            },
            {
                difficulty: 'medium',
                size: 9,
                puzzle: [
                    { x: 1, y: 4, type: 'water' },
                    { x: 4, y: 5, type: 'water' },
                    { x: 5, y: 7, type: 'ship_single' },
                    { x: 7, y: 7, type: 'ship' },
                ],
                solution: [
                    { x: 0, y: 5, type: 'ship_top' },
                    { x: 1, y: 0, type: 'ship_left' },
                    { x: 1, y: 1, type: 'ship' },
                    { x: 1, y: 2, type: 'ship' },
                    { x: 1, y: 3, type: 'ship_right' },
                    { x: 1, y: 5, type: 'ship_bottom' },
                    { x: 1, y: 7, type: 'ship_single' },
                    { x: 3, y: 2, type: 'ship_top' },
                    { x: 4, y: 0, type: 'ship_single' },
                    { x: 4, y: 2, type: 'ship' },
                    { x: 5, y: 2, type: 'ship_bottom' },
                    { x: 5, y: 4, type: 'ship_left' },
                    { x: 5, y: 5, type: 'ship_right' },
                    { x: 5, y: 7, type: 'ship_single' },
                    { x: 7, y: 0, type: 'ship_single' },
                    { x: 7, y: 2, type: 'ship_left' },
                    { x: 7, y: 3, type: 'ship_right' },
                    { x: 7, y: 6, type: 'ship_left' },
                    { x: 7, y: 7, type: 'ship' },
                    { x: 7, y: 8, type: 'ship_right' },
                ],
                shipsRows: [1, 6, 0, 1, 2, 4, 0, 6, 0],
                shipsColumns: [3, 1, 5, 2, 1, 3, 1, 3, 1],
                ships: [
                    { size: 1, count: 4 },
                    { size: 2, count: 3 },
                    { size: 3, count: 2 },
                    { size: 4, count: 1 },
                ],
            },
        ],
    },
    getters: {
        board: state => state.activeGame.board,
        undoStack: state => state.activeGame.undoStack,
        redoStack: state => state.activeGame.redoStack,
        games: state => state.games,
    },
    mutations: {
        initBoard(state, board) {
            state.activeGame.board = board;
        },
        saveBoard(state, board) {
            state.activeGame.undoStack.push(clone(state.activeGame.board));

            state.activeGame.board = board;
        },
        undo(state) {
            if (state.activeGame.undoStack.length === 0) {
                return;
            }

            state.activeGame.redoStack.push(clone(state.activeGame.board));
            state.activeGame.board = state.activeGame.undoStack.pop();
        },
        redo(state) {
            if (state.activeGame.redoStack.length === 0) {
                return;
            }

            state.activeGame.undoStack.push(clone(state.activeGame.board));
            state.activeGame.board = state.activeGame.redoStack.pop();
        },
        clear(state) {
            state.activeGame.redoStack = [];
            state.activeGame.undoStack = [];
            state.activeGame.board = [];
        }
    },
    actions: {},
    modules: {},
});
