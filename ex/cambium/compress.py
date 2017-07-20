import string


def compress(s):
    count = 1
    output = s[0]

    for i in range(0, len(s)-1):
        if s[i] == s[i+1]:
            count += 1
        else:
            if count > 1:
                output = output + str(count)
            output = output + s[i+1]
            count = 1
    if count < 1:
        output = output + str(count)

    return output

print compress(raw_input())
