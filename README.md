# Capacitor-Relaxation

  Calculating electric potential can be done analytically by solving Laplace's equation. The solutions and difficulty of finding them varies greatly with the geometry of the system. By defining boundry conditions we can find an approximate solution by a computational method. Holding certain regions at equipotentials (representing conductors) we can let the value of the potential propigate through empty space by matching each point to the average of the potentials around it.
  
  Here is an examples:
  
  note, treat the top as grounded and sides (potential always = 0) and the bottom as a conductor held at potential 1.
  
    0 0 0 0 0  |  0 0    0    0    0  |  0 0     0     0     0  |  0 0    0     0    0
    0 0 0 0 0  |  0 0    0    0    0  |  0 0.063 0.063 0.063 0  |  0 0.94 0.125 0.94 0 
    0 0 0 0 0  |  0 0.25 0.25 0.25 0  |  0 0.313 0.375 0.313 0  |  0 0.36 0.422 0.36 0
    0 1 1 1 0  |  0 1    1    1    0  |  0 1     1     1     0  |  0 1    1     1    0 
    

As you can see, each iterations depends only on the values surrounding each point, not on the points previous value.

In general b[i][j] = a[i+1][j] + a[i-1][j] + a[i][j+1] + a[i][j-1], then all a[i][j] is set equal to b[i][j]

This method uses two arrays, one that holds all your values after each completed iterations and one used to calulate values during each iteration.
