import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class SQLGenerator {

    public static void main(String[] args) {
        String fileName = "files/teams.txt"; // Update with the actual path to your file
        //String fileName = "files/players.txt"; // Update with the actual path to your file
        //String fileName = "files/staff.txt"; // Update with the actual path to your file
        //String fileName = "files/analytics.txt"; // Update with the actual path to your file
        //String fileName = "files/season.txt"; // Update with the actual path to your file
        //String fileName = "files/socialmedia.txt"; // Update with the actual path to your file
        //String fileName = "files/captains.txt"; // Update with the actual path to your file

        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            String line;
            int playerId = 1;

            while ((line = br.readLine()) != null) {
                String[] values = line.split("\\|");

                StringBuilder insertStatement = new StringBuilder("INSERT INTO Team VALUES (");


                for (int i = 0; i < values.length; i++) {
                    if (i > 0) {
                        insertStatement.append(", ");
                    }

                    // Use single quotes for non-numeric values
                    if (isNumeric(values[i])) {
                        insertStatement.append(values[i]);
                    } else {
                        insertStatement.append("'").append(values[i]).append("'");
                    }
                }

                insertStatement.append(");");
                System.out.println(insertStatement);
                playerId++;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static boolean isNumeric(String str) {
        try {
            Integer.parseInt(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
