def check_winner(board):
    wins = [(0, 1, 2), (3, 4, 5), (6, 7, 8),
            (0, 3, 6), (1, 4, 7), (2, 5, 8),
            (0, 4, 8), (2, 4, 6)]
    
    for a, b, c in wins:
        if board[a] == board[b] == board[c] and board[a] != '_':
            return board[a]
    
    return None

def ai_move(board):
    best_score = -float('inf')
    move = None

    for i in range(len(board)):
        if board[i] == '_':
            board[i] = 'X'
            score = minimax(board, 0, False)
            board[i] = '_'
            if score > best_score:
                best_score = score
                move = i

    board[move] = 'X'
    return board

def minimax(board, depth, is_maximizing):
    winner = check_winner(board)
    if winner == 'X':
        return 1
    elif winner == 'O':
        return -1
    elif '_' not in board:
        return 0

    if is_maximizing:
        best_score = -float('inf')
        for i in range(len(board)):
            if board[i] == '_':
                board[i] = 'X'
                score = minimax(board, depth + 1, False)
                board[i] = '_'
                best_score = max(score, best_score)
        return best_score
    else:
        best_score = float('inf')
        for i in range(len(board)):
            if board[i] == '_':
                board[i] = 'O'
                score = minimax(board, depth + 1, True)
                board[i] = '_'
                best_score = min(score, best_score)
        return best_score