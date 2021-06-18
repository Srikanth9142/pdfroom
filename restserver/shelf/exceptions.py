class TokenExpiredException(Exception):
    """
    Custom exception for token expired error when retrieving user info from tokenId
    """
    def __init__(self, value):
        self.value = value
    
    def __str__(self):
        return self.value

