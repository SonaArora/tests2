#include <stdio.h>
#include <stdlib.h>

int fab (int n) {
    
    if (n == 0)
        return 0;
    else if (n == 1)
        return 1;
    else
        return fab (n-1) + fab (n-2);
}

int main() {
    static int num = 5;
    
    printf ("%d", fab(num));
    num--;
    main();

}
