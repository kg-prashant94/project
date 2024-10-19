import java.util.*;

public class ServerFarm {

    // Function to minimize power consumption while avoiding conflicts
    public static int minimizePower(int[] power, List<int[]> conflicts) {
        int n = power.length;

        // Create a graph to represent conflicts using adjacency matrix
        boolean[][] conflictGraph = new boolean[n][n];
        for (int[] conflict : conflicts) {
            conflictGraph[conflict[0]][conflict[1]] = true;
            conflictGraph[conflict[1]][conflict[0]] = true;
        }

        // Backtrack to find the minimum power subset
        return backtrack(power, conflictGraph, 0, new boolean[n]);
    }

    // Backtracking function to explore subsets of servers
    private static int backtrack(int[] power, boolean[][] conflictGraph, int index, boolean[] selected) {
        if (index == power.length) {
            return calculatePower(power, selected);
        }

        // Case 1: Do not select this server
        int minPower = backtrack(power, conflictGraph, index + 1, selected);

        // Case 2: Select this server if it doesn't conflict with already selected ones
        if (!hasConflict(index, conflictGraph, selected)) {
            selected[index] = true;
            minPower = Math.min(minPower, backtrack(power, conflictGraph, index + 1, selected));
            selected[index] = false; // Backtrack
        }

        return minPower;
    }

    // Check if selecting the server at index causes any conflict with already selected servers
    private static boolean hasConflict(int index, boolean[][] conflictGraph, boolean[] selected) {
        for (int i = 0; i < selected.length; i++) {
            if (selected[i] && conflictGraph[index][i]) {
                return true; // Conflict detected
            }
        }
        return false;
    }

    // Calculate the total power for the selected subset of servers
    private static int calculatePower(int[] power, boolean[] selected) {
        int totalPower = 0;
        for (int i = 0; i < power.length; i++) {
            if (selected[i]) {
                totalPower += power[i];
            }
        }
        return totalPower;
    }

    public static void main(String[] args) {
        // Example: 3 servers with power [5, 8, 2], conflicts [[0, 1], [1, 2]]
        int[] power = {5, 8, 2};
        List<int[]> conflicts = new ArrayList<>();
        conflicts.add(new int[]{0, 1});
        conflicts.add(new int[]{1, 2});

        int result = minimizePower(power, conflicts);
        System.out.println("Minimum power required: " + result); // Expected output: 2
    }
}