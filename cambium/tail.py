import os

def tail(filename, line) :
    fsize=os.stat(filename).st_size
    i=0
    buffer = 1000
    if buffer > fsize :
        with open(filename) as f:
            info = []
            f.seek(fsize-buffer * i)
            info.extend(f.readlines())




tail("file1.txt", 5)
