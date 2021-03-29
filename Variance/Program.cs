using System;

namespace Variance
{
    class Program
    {
        static void Main(string[] args)
        {
            // 2. 버그리포트 추가 (데이터가 없을 경우에는 분산을 계산할 수 없다.)
            if (args.Length == 0) {
                Console.WriteLine("데이터가 입력되지 않았습니다.");
                return;

            } 
            // 3. 버그리포트 추가 (데이터가 1개 일 경우 에는 분산을 계산할 수 없다.)
            else if (args.Length == 1){
                Console.WriteLine("데이터를 두개이상 입력하시오.");
                return;
            }

            // 1. 분산을 구하기 위한 프로그램 작성
            double[] s = new double[args.Length];
            for (int i = 0; i < s.Length; i++) {
                s[i] = double.Parse(args[i]);
            }
            double sum = 0.0;

            for (int i = 0; i < s.Length; i++){
                sum += s[i];
            }

            double mean = sum / s.Length;
            double sumOfSquares = 0.0;
            for (int i = 0; i < s.Length; i++){
                sumOfSquares += ( s[i] - mean ) * ( s[i] - mean );
            }
            double variance = sumOfSquares / (s.Length - 1);
            Console.WriteLine($"분산 : {variance}");
        }
    }
}
