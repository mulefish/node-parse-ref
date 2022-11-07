
f = open("really_big_file.csv", "r") 
for line in f: 
    pieces = line.split(",")
    print( pieces[0])
